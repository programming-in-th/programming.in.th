import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

import JSZip from 'jszip'
import { ZodError } from 'zod'

import { TaskSchema } from '@/lib/api/schema/tasks'
import prisma from '@/lib/prisma'
import { s3Client } from '@/lib/s3Client'
import { getServerUser } from '@/lib/session'
import {
  badRequest,
  forbidden,
  internalServerError,
  json,
  unauthorized
} from '@/utils/apiResponse'

export async function GET() {
  const user = await getServerUser()

  const task = await prisma.task.findMany({
    ...(!user?.admin && { where: { private: false } })
  })

  return json(task)
}

export const config = {
  api: {
    bodyParser: false
  }
}

export async function POST(req: NextRequest) {
  const user = await getServerUser()

  if (!user) return unauthorized()
  if (!user.admin) return forbidden()

  try {
    const formData = await req.formData()

    const task = TaskSchema.parse(JSON.parse(formData.get('json') as string))

    const file = formData.get('file') as Blob | null

    if (file) {
      const zip = new JSZip()
      const buffer = Buffer.from(await file.arrayBuffer())
      await zip.loadAsync(buffer).then(data => {
        data.forEach(async (relPath, file) => {
          const nbuffer = Buffer.from(await file.async('arraybuffer'))
          s3Client.putObject({
            Bucket: process.env.BUCKET_NAME,
            Key: `testcases/${task.id}/${relPath}`,
            Body: nbuffer
          })
        })
      })
    }

    // TODO : check formatting of zip file

    // const path = task.categoryId.split('/')
    // for (let i = 0; i < path.length; i++) {
    //   await prisma.category.upsert({
    //     where: { id: path.slice(0, i + 1).join('/') },
    //     update: {},
    //     create: {
    //       id: path.slice(0, i + 1).join('/'),
    //       name: path[i],
    //       parentCategoryId: path.slice(0, i).join('/') || null
    //     }
    //   })
    // }

    const createdTask = await prisma.task.create({
      data: {
        ...task,
        tags: {
          connectOrCreate: task.tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      }
    })

    revalidatePath('/tasks')
    return json(createdTask)
  } catch (err) {
    if (err instanceof ZodError) {
      return badRequest()
    } else {
      return internalServerError()
    }
  }
}

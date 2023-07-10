import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
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

export async function POST(req: NextRequest) {
  const user = await getServerUser()

  if (!user) return unauthorized()
  if (!user.admin) return forbidden()

  try {
    const task = TaskSchema.parse(await req.json())

    const path = task.categoryId.split('/')
    for (let i = 0; i < path.length; i++) {
      await prisma.category.upsert({
        where: { id: path.slice(0, i + 1).join('/') },
        update: {},
        create: {
          id: path.slice(0, i + 1).join('/'),
          name: path[i],
          parentCategoryId: path.slice(0, i).join('/') || null
        }
      })
    }
    const uploadUrl = []
    if (task.files) {
      for (const file of task.files) {
        const Key =
          file.type === 'application/pdf'
            ? `statements/pdf/${task.id}.pdf`
            : `statements/${task.id}/${file.path}`
        const url = await getSignedUrl(
          s3Client,
          new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key,
            ContentType: file.type
          }),
          { expiresIn: 15 * 60 }
        )
        uploadUrl.push({ path: file.path, url })
      }
    }

    delete task['files']

    await prisma.task.create({
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

    revalidatePath('/')
    revalidatePath('/tasks')
    return json(uploadUrl)
  } catch (err) {
    console.log(err)
    if (err instanceof ZodError) {
      return badRequest()
    } else {
      return internalServerError()
    }
  }
}

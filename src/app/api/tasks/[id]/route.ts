import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

import { DeleteObjectsCommandInput } from '@aws-sdk/client-s3'
import JSZip from 'jszip'
import { ZodError } from 'zod'

import checkUserPermissionOnTask from '@/lib/api/queries/checkUserPermissionOnTask'
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

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id

  const task = await prisma.task.findUnique({
    where: { id }
  })

  if (task?.private) {
    const user = await getServerUser()

    if (!user) {
      return unauthorized()
    }

    if (!(await checkUserPermissionOnTask(user, task.id))) {
      return forbidden()
    }

    return json(task)
  }

  return json(task)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id

  const user = await getServerUser()

  if (!user) {
    return unauthorized()
  }

  if (!user.admin) {
    return forbidden()
  }

  try {
    const formData = await req.formData()

    const task = TaskSchema.parse(JSON.parse(formData.get('json') as string))

    if (id !== task.id) {
      return badRequest()
    }

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

    // TODO: Remove unused categories

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...task,
        id,
        tags: {
          connectOrCreate: task.tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      }
    })
    revalidatePath('/tasks')

    return json(updatedTask)
  } catch (err) {
    if (err instanceof ZodError) {
      return badRequest()
    } else {
      return internalServerError()
    }
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id

  const user = await getServerUser()

  if (!user) return unauthorized()

  if (!user.admin) return forbidden()

  const deletedTask = await prisma.task.delete({
    where: { id }
  })

  const listedObjects = await s3Client.listObjects({
    Bucket: process.env.BUCKET_NAME,
    Prefix: `testcases/${id}/`
  })

  if (listedObjects.Contents) {
    const deleteParams: DeleteObjectsCommandInput = {
      Bucket: process.env.BUCKET_NAME,
      Delete: { Objects: [] }
    }

    listedObjects.Contents.forEach(({ Key }) => {
      if (Key) deleteParams?.Delete?.Objects?.push({ Key })
    })

    await s3Client.deleteObjects(deleteParams)
  }
  revalidatePath('/tasks')
  // TODO: Remove unused categories

  return json(deletedTask)
}

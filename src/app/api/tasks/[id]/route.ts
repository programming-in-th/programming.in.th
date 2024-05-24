import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

import { DeleteObjectsCommandInput, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import checkUserPermissionOnTask from '@/lib/api/queries/checkUserPermissionOnTask'
import { TaskSchema } from '@/lib/api/schema/tasks'
import prisma from '@/lib/prisma'
import { s3Client } from '@/lib/s3Client'
import { getServerUser } from '@/lib/session'
import { badRequest, forbidden, json, unauthorized } from '@/utils/apiResponse'

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

  const parsedTask = TaskSchema.safeParse(await req.json())

  if (!parsedTask.success) {
    return badRequest()
  }

  const task = parsedTask.data

  const user = await getServerUser()

  if (!user) {
    return unauthorized()
  }

  if (!user.admin) {
    return forbidden()
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

  const uploadUrl = []
  if (task.files) {
    for (const file of task.files) {
      const Key =
        file.type === 'application/pdf'
          ? `statements/pdf/${task.id}.pdf`
          : file.type === 'application/zip'
            ? `statements/attachments/${task.id}.zip`
            : `testcases/${task.id}/${file.path}`
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

  // TODO: Remove unused categories

  await prisma.task.update({
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
  revalidatePath('/')
  revalidatePath('/tasks')

  return json(uploadUrl)
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id

  console.log(id)

  const user = await getServerUser()

  if (!user) {
    return unauthorized()
  }

  if (!user.admin) {
    return forbidden()
  }

  const deletedTask = await prisma.task.delete({
    where: { id }
  })

  const listedObjects = await s3Client.listObjects({
    Bucket: process.env.BUCKET_NAME,
    Prefix: `testcases/${id}/`
  })

  const deleteParams: DeleteObjectsCommandInput = {
    Bucket: process.env.BUCKET_NAME,
    Delete: { Objects: [] }
  }

  if (listedObjects.Contents) {
    listedObjects.Contents.forEach(({ Key }) => {
      if (Key) deleteParams?.Delete?.Objects?.push({ Key })
    })
  }
  deleteParams?.Delete?.Objects?.push({ Key: `statements/pdf/${id}.pdf` })
  await s3Client.deleteObjects(deleteParams)

  revalidatePath('/')
  revalidatePath('/tasks')
  // TODO: Remove unused categories

  return json(deletedTask)
}

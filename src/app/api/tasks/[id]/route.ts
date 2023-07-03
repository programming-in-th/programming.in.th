import { NextRequest } from 'next/server'

import checkUserPermissionOnTask from '@/lib/api/queries/checkUserPermissionOnTask'
import { TaskSchema } from '@/lib/api/schema/tasks'
import prisma from '@/lib/prisma'
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

  return json(updatedTask)
}

export async function DELETE(
  _: NextRequest,
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

  const deletedTask = await prisma.task.delete({
    where: { id }
  })

  // TODO: Remove unused categories

  return json(deletedTask)
}

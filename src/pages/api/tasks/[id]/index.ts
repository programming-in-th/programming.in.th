import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import checkUserPermissionOnTask from '@/lib/api/queries/checkUserPermissionOnTask'
import { IndividualTaskSchema, TaskSchema } from '@/lib/api/schema/tasks'
import prisma from '@/lib/prisma'
import {
  unauthorized,
  methodNotAllowed,
  ok,
  forbidden,
  badRequest
} from '@/utils/response'

import { authOptions } from '../../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { query } = req
    const parsedQuery = IndividualTaskSchema.safeParse(query)

    if (!parsedQuery.success) {
      return badRequest(res)
    }

    const { id } = parsedQuery.data

    const task = await prisma.task.findUnique({
      where: { id }
    })

    if (task?.private) {
      const session = await unstable_getServerSession(req, res, authOptions)

      if (!session) {
        return unauthorized(res)
      }

      if (!(await checkUserPermissionOnTask(session, task.id))) {
        return forbidden(res)
      }

      return ok(res, task)
    }

    return ok(res, task)
  } else if (req.method === 'PUT') {
    const { query, body } = req
    const parsedQuery = IndividualTaskSchema.safeParse(query)

    if (!parsedQuery.success) {
      return badRequest(res)
    }

    const parsedTask = TaskSchema.safeParse(body)

    if (!parsedTask.success) {
      return badRequest(res)
    }

    const task = parsedTask.data

    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      return unauthorized(res)
    }

    if (!session.user.admin) {
      return forbidden(res)
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
      where: { id: parsedQuery.data.id },
      data: {
        ...task,
        id: parsedQuery.data.id,
        tags: {
          connectOrCreate: task.tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      }
    })

    return ok(res, updatedTask)
  } else if (req.method === 'DELETE') {
    const { query } = req
    const parsedQuery = IndividualTaskSchema.safeParse(query)

    if (!parsedQuery.success) {
      return badRequest(res)
    }

    const { id } = parsedQuery.data

    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      return unauthorized(res)
    }

    if (!session.user.admin) {
      return forbidden(res)
    }

    const deletedTask = await prisma.task.delete({
      where: { id }
    })

    // TODO: Remove unused categories

    return ok(res, deletedTask)
  }

  return methodNotAllowed(res, ['GET', 'PUT', 'DELETE'])
}

import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import { TaskSchema } from '@/lib/api/schema/tasks'
import prisma from '@/lib/prisma'
import {
  unauthorized,
  methodNotAllowed,
  ok,
  forbidden,
  badRequest
} from '@/utils/response'

import { authOptions } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const session = await unstable_getServerSession(req, res, authOptions)

    const task = await prisma.task.findMany({
      ...(!session?.user.admin && { where: { private: false } })
    })

    return ok(res, task)
  } else if (req.method === 'POST') {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      return unauthorized(res)
    }

    if (!session.user.admin) {
      return forbidden(res)
    }

    try {
      const task = TaskSchema.parse(req.body)

      const createdTask = await prisma.task.create({
        data: { ...task }
      })

      return ok(res, createdTask)
    } catch {
      return badRequest(res)
    }
  }

  return methodNotAllowed(res, ['GET', 'POST'])
}

import type { NextApiRequest, NextApiResponse } from 'next'

import { getServerSession } from 'next-auth'

import { BookmarkCDSchema } from '@/lib/api/schema/bookmark'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import {
  badRequest,
  methodNotAllowed,
  ok,
  unauthorized
} from '@/utils/response'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      return unauthorized(res)
    }

    const { body } = req

    const parsedBody = BookmarkCDSchema.safeParse(body)

    if (!parsedBody.success) {
      return badRequest(res)
    }

    const { taskId } = parsedBody.data

    const bookmark = await prisma.bookmark.create({
      data: {
        task: { connect: { id: taskId } },
        user: { connect: { id: session.user.id! } }
      }
    })

    return ok(res, bookmark)
  } else if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      return unauthorized(res)
    }

    const { body } = req

    const parsedBody = BookmarkCDSchema.safeParse(body)

    if (!parsedBody.success) {
      return badRequest(res)
    }

    const { taskId } = parsedBody.data

    const bookmark = await prisma.bookmark.delete({
      where: {
        taskId_userId: {
          taskId,
          userId: session.user.id!
        }
      }
    })

    return ok(res, bookmark)
  }

  return methodNotAllowed(res, ['GET', 'POST', 'DELETE'])
}

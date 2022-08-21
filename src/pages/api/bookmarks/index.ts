import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import { BookmarkCDSchema } from '@/lib/api/schema/bookmark'
import prisma from '@/lib/prisma'
import {
  badRequest,
  methodNotAllowed,
  ok,
  unauthorized
} from '@/utils/response'

import { authOptions } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      return unauthorized(res)
    }

    const rawBookmark = await prisma.bookmark.findMany({
      where: {
        user: {
          id: { equals: session.user.id! }
        }
      }
    })

    const bookmarks = rawBookmark.map(bookmark => {
      return bookmark.taskId
    })

    return ok(res, bookmarks)
  } else if (req.method === 'POST') {
    const session = await unstable_getServerSession(req, res, authOptions)

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
    const session = await unstable_getServerSession(req, res, authOptions)

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

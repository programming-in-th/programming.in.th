import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import { BookmarkCDSchema } from '@/lib/api/schema/bookmark'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import {
  methodNotAllowed,
  unauthorized,
  ok,
  badRequest
} from '@/utils/response'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      return unauthorized(res)
    }

    const { query } = req

    const parsedQuery = BookmarkCDSchema.safeParse(query)

    if (!parsedQuery.success) {
      return badRequest(res)
    }

    const { taskId } = parsedQuery.data

    const bookmark = await prisma.bookmark.findUnique({
      where: {
        taskId_userId: {
          taskId: taskId,
          userId: session.user.id!
        }
      }
    })

    return ok(res, bookmark !== null)
  }

  return methodNotAllowed(res, ['GET'])
}

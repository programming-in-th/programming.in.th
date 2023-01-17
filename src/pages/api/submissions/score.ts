import type { NextApiRequest, NextApiResponse } from 'next'

import { Prisma } from '@prisma/client'
import { unstable_getServerSession } from 'next-auth'

import { getAllTaskForUser } from '@/lib/api/queries/getAllTaskForUser'
import prisma from '@/lib/prisma'
import { methodNotAllowed, ok, unauthorized } from '@/utils/response'

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

    const maxScore = (await prisma.$queryRaw(
      Prisma.sql`SELECT task_id, max(score) FROM submission WHERE user_id = ${session.user.id} GROUP BY task_id;`
    )) as Array<{ taskId: string; max: number }>

    if (session.user.admin) {
      return ok(res, maxScore)
    }

    const usersTasks = await getAllTaskForUser(session.user.id!)
    const filteredMaxScore = maxScore.filter(ms =>
      usersTasks.includes(ms.taskId)
    )

    return ok(res, filteredMaxScore)
  }

  return methodNotAllowed(res, ['GET'])
}

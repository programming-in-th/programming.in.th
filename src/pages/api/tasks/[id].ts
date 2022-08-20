import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import prisma from '@/lib/prisma'
import { unauthorized, methodNotAllowed, ok, forbidden } from '@/utils/response'

import { authOptions } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { query } = req

    const task = await prisma.task.findUnique({
      where: { id: String(query.id) }
    })

    if (task.private) {
      const session = await unstable_getServerSession(req, res, authOptions)

      if (!session) {
        return unauthorized(res)
      }

      const userOnAssessment = await prisma.userOnAssessment.findMany({
        where: {
          userId: session.user.id
        }
      })

      const taskOnAssessment = await prisma.taskOnAssessment.findMany({
        where: {
          taskId: task.id
        }
      })

      if (
        !userOnAssessment.some(user =>
          taskOnAssessment.some(task => task.assessmentId === user.assessmentId)
        )
      ) {
        return forbidden(res)
      }

      return ok(res, task)
    }

    return ok(res, task)
  }

  return methodNotAllowed(res, ['GET'])
}

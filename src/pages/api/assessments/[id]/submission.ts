import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import { getInfiniteSubmission } from '@/lib/api/queries/getInfiniteSubmissions'
import { Filter } from '@/lib/api/queries/getPersonalizedSubmissions'
import { compressCode } from '@/lib/codeTransformer'
import prisma from '@/lib/prisma'
import { unauthorized, methodNotAllowed, ok, forbidden } from '@/utils/response'

import { authOptions } from '../../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { query } = req

    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      return unauthorized(res)
    }

    if (query.filter === Filter.TASK) {
      const infiniteSubmission = await getInfiniteSubmission(
        String(query.taskId),
        Number(query.cursor),
        Number(query.limit),
        String(query.id),
        session.user.id
      )

      return ok(res, infiniteSubmission)
    }
  } else if (req.method === 'POST') {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      return unauthorized(res)
    }

    const {
      body: { taskId, code, language }
    } = req

    const userOnAssessment = await prisma.userOnAssessment.findMany({
      where: {
        userId: session.user.id
      }
    })

    const taskOnAssessment = await prisma.taskOnAssessment.findMany({
      where: {
        taskId: taskId
      }
    })

    if (
      !userOnAssessment.some(user =>
        taskOnAssessment.some(task => task.assessmentId === user.assessmentId)
      )
    ) {
      return forbidden(res)
    }

    const compressedCode = await compressCode(JSON.stringify(code))

    const submission = await prisma.submission.create({
      data: {
        task: { connect: { id: taskId } },
        code: compressedCode,
        language,
        user: { connect: { id: session.user.id } },
        groups: [],
        private: true,
        assessment: { connect: { id: String(req.query.id) } }
      }
    })

    return ok(res, submission)
  }

  return methodNotAllowed(res, ['GET', 'POST'])
}

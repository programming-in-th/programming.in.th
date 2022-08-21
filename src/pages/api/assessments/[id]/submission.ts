import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import checkUserPermissionOnTask from '@/lib/api/queries/checkUserPermissionOnTask'
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
      body: { taskId, code, language },
      query
    } = req

    const task = await prisma.task.findUnique({
      where: { id: taskId }
    })

    if (checkUserPermissionOnTask(session.user.id, task.id)) {
      return forbidden(res)
    }

    const compressedCode = await compressCode(JSON.stringify(code))

    const submission = await prisma.submission.create({
      data: {
        task: { connect: task },
        code: compressedCode,
        language,
        user: { connect: { id: session.user.id } },
        groups: [],
        private: true,
        assessment: { connect: { id: String(query.id) } }
      }
    })

    return ok(res, submission)
  }

  return methodNotAllowed(res, ['GET', 'POST'])
}

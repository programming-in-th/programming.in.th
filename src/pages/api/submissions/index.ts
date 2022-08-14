import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import { getInfiniteSubmission } from '@/lib/api/queries/getInfiniteSubmissions'
import {
  Filter,
  getPersonalizedSubmission
} from '@/lib/api/queries/getPersonalizedSubmissions'
import { compressCode } from '@/lib/codeTransformer'
import prisma from '@/lib/prisma'
import { unauthorized, methodNotAllowed, ok } from '@/utils/response'

import { authOptions } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { query } = req

    const session = await unstable_getServerSession(req, res, authOptions)

    if (query.filter === Filter.OWN && !session) {
      return unauthorized(res)
    }

    if (query.filter === Filter.TASK) {
      const infiniteSubmission = await getInfiniteSubmission(
        String(query.taskId),
        Number(query.cursor),
        Number(query.limit)
      )

      return ok(res, infiniteSubmission)
    } else {
      const submission = await getPersonalizedSubmission(
        Array.isArray(query.filter) ? query.filter : [query.filter],
        session,
        String(query.taskId)
      )

      return ok(res, submission)
    }
  } else if (req.method === 'POST') {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      return unauthorized(res)
    }

    const {
      body: { taskId, code, language }
    } = req

    const compressedCode = await compressCode(JSON.stringify(code))

    const submission = await prisma.submission.create({
      data: {
        task: { connect: { id: taskId } },
        code: compressedCode,
        language: language,
        user: { connect: { id: session.user.id } },
        groups: []
      }
    })

    return ok(res, submission)
  }

  return methodNotAllowed(res, ['GET', 'POST'])
}

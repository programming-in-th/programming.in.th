import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import { getFilteredSubmissions } from '@/lib/api/queries/getFilteredSubmissions'
import { getInfiniteSubmissions } from '@/lib/api/queries/getInfiniteSubmissions'
import {
  SubmissionSchema,
  SubmissionFilterEnum as Filter,
  SubmitSchema
} from '@/lib/api/schema/submissions'
import { compressCode } from '@/lib/codeTransformer'
import prisma from '@/lib/prisma'
import {
  unauthorized,
  methodNotAllowed,
  ok,
  badRequest
} from '@/utils/response'

import { authOptions } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { query } = req

    const parsedQuery = SubmissionSchema.safeParse(query)

    if (!parsedQuery.success) {
      return badRequest(res)
    }

    const { taskId, cursor, limit, filter } = parsedQuery.data

    const session = await unstable_getServerSession(req, res, authOptions)

    if (filter === Filter.enum.own && !session) {
      return unauthorized(res)
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      select: { private: true }
    })

    if (task?.private) {
      if (!session) {
        return unauthorized(res)
      }

      const user = await prisma.user.findUnique({
        where: { id: session.user.id! }
      })

      if (!user?.admin) {
        return unauthorized(res)
      }
    }

    if (filter === Filter.enum.task) {
      const infiniteSubmission = await getInfiniteSubmissions(
        limit,
        cursor,
        taskId
      )

      return ok(res, infiniteSubmission)
    } else {
      const submission = await getFilteredSubmissions(
        filter ? (Array.isArray(filter) ? filter : [filter]) : [],
        taskId,
        session ? session : undefined
      )

      return ok(res, submission)
    }
  } else if (req.method === 'POST') {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      return unauthorized(res)
    }

    const { body } = req

    const parsedBody = SubmitSchema.safeParse(body)

    if (!parsedBody.success) {
      return badRequest(res)
    }

    const { taskId, language, code } = parsedBody.data

    const compressedCode = await compressCode(JSON.stringify(code))

    const submission = await prisma.submission.create({
      data: {
        task: { connect: { id: taskId } },
        code: compressedCode,
        language: language,
        user: { connect: { id: session.user.id! } },
        groups: []
      }
    })

    return ok(res, submission)
  }

  return methodNotAllowed(res, ['GET', 'POST'])
}

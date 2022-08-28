import type { NextApiRequest, NextApiResponse } from 'next'

import { IndividualSubmissionSchema } from '@/lib/api/schema/submissions'
import { decompressCode } from '@/lib/codeTransformer'
import prisma from '@/lib/prisma'
import {
  badRequest,
  forbidden,
  methodNotAllowed,
  notFound,
  ok,
  unauthorized
} from '@/utils/response'
import checkUserPermissionOnTask from '@/lib/api/queries/checkUserPermissionOnTask'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { query } = req

    const parsedQuery = IndividualSubmissionSchema.safeParse(query)

    if (!parsedQuery.success) {
      return badRequest(res)
    }
    const { id } = parsedQuery.data

    const session = await unstable_getServerSession(req, res, authOptions)

    const submission = await prisma.submission.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        score: true,
        groups: true,

        task: {
          select: {
            id: true,
            private: true
          }
        }
      }
    })

    if (!submission) {
      return notFound(res)
    }

    if (submission.task?.private) {
      if (!session) {
        return unauthorized(res)
      }

      if (!(await checkUserPermissionOnTask(session, submission.task.id))) {
        return forbidden(res)
      }
    }

    const payload: DeepPartial<typeof submission> = submission

    delete payload.task

    return ok(res, payload)
  }

  return methodNotAllowed(res, ['GET'])
}

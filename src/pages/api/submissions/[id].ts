import type { NextApiRequest, NextApiResponse } from 'next'

import { IndividualSubmissionSchema } from '@/lib/api/schema/submission'
import { decompressCode } from '@/lib/codeTransformer'
import prisma from '@/lib/prisma'
import { badRequest, methodNotAllowed, notFound, ok } from '@/utils/response'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req

  const parsedQuery = IndividualSubmissionSchema.safeParse(query)

  if (!parsedQuery.success) {
    return badRequest(res)
  }

  const { id } = parsedQuery.data

  if (req.method === 'GET') {
    const submission = await prisma.submission.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        submittedAt: true,
        time: true,
        memory: true,
        score: true,
        groups: true,
        language: true,
        user: {
          select: {
            username: true
          }
        },
        code: true
      }
    })

    if (!submission) {
      return notFound(res)
    }

    const payload = {
      ...submission,
      code: await decompressCode(submission.code)
    }

    return ok(res, payload)
  }

  return methodNotAllowed(res, ['GET'])
}

import type { NextApiRequest, NextApiResponse } from 'next'

import { decompressCode } from '@/lib/codeTransformer'
import prisma from '@/lib/prisma'
import { methodNotAllowed, notFound, ok } from '@/utils/response'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id }
  } = req

  if (req.method === 'GET') {
    const submission = await prisma.submission.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        status: true,
        submittedAt: true,
        time: true,
        memory: true,
        score: true,
        groups: true,
        language: true,
        user: true,
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

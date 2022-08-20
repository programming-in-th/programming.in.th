import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import prisma from '@/lib/prisma'
import { methodNotAllowed, unauthorized, ok } from '@/utils/response'

import { authOptions } from '../../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      return unauthorized(res)
    }

    const assessment = await prisma.assessment.findUnique({
      where: {
        id: String(req.query.id)
      }
    })

    return ok(res, assessment)
  }

  return methodNotAllowed(res, ['GET'])
}

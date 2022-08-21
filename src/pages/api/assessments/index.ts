import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import prisma from '@/lib/prisma'
import { unauthorized, methodNotAllowed, ok } from '@/utils/response'

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

    const assessment = await prisma.assessment.findMany({
      where: { users: { some: { userId: session.user.id! } } }
    })

    return ok(res, assessment)
  }

  return methodNotAllowed(res, ['GET', 'POST'])
}

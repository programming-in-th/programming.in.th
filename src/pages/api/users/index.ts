import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import { checkOwnerPermission } from '@/lib/api/queries/checkOwnerPermissionOnAssessment'
import prisma from '@/lib/prisma'
import { unauthorized, methodNotAllowed, ok, forbidden } from '@/utils/response'

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

    if (
      !session.user.admin &&
      !(await checkOwnerPermission(session.user.id!))
    ) {
      return forbidden(res)
    }

    const user = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true
      }
    })

    return ok(res, user)
  }

  return methodNotAllowed(res, ['GET'])
}

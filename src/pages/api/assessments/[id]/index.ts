import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import prisma from '@/lib/prisma'
import {
  methodNotAllowed,
  unauthorized,
  ok,
  badRequest
} from '@/utils/response'

import { authOptions } from '../../auth/[...nextauth]'
import { IndividualAssessmentSchema } from '@/lib/api/schema/assessment'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { query } = req
    const parsedQuery = IndividualAssessmentSchema.safeParse(query)

    if (!parsedQuery.success) {
      return badRequest(res)
    }

    const { id } = parsedQuery.data
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      return unauthorized(res)
    }

    const assessment = await prisma.assessment.findFirst({
      where: {
        id,
        users: {
          some: {
            userId: session.user.id!
          }
        }
      }
    })

    return ok(res, assessment)
  }

  return methodNotAllowed(res, ['GET'])
}

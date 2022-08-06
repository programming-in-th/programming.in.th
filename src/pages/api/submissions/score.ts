import type { NextApiRequest, NextApiResponse } from 'next'

import { Prisma } from '@prisma/client'
import { unstable_getServerSession } from 'next-auth'

import prisma from '@/lib/prisma'

import { authOptions } from '../auth/[...nextauth]'

// @TODO Redesign REST API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET':
      const session = await unstable_getServerSession(req, res, authOptions)
      if (!session) {
        res.status(401).end('Unauthorized')
      }

      const maxScore = await prisma.$queryRaw(
        Prisma.sql`SELECT "taskId", max(score) FROM "Submission" WHERE "userId" = ${session.user.id} GROUP BY "taskId";`
      )

      res.status(200).json(maxScore)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

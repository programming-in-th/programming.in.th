import type { NextApiRequest, NextApiResponse } from 'next'

import { Prisma } from '@prisma/client'

import prisma from '@/lib/prisma'

// @TODO Redesign REST API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET':
      const solved = await prisma.$queryRaw(
        Prisma.sql`SELECT COUNT(DISTINCT "userId"), "taskId" FROM "Submission" WHERE "score" = 100 GROUP BY "taskId"`
      )

      res
        .status(200)
        .end(
          JSON.stringify(solved, (_, v) =>
            typeof v === 'bigint' ? `${v}n` : v
          ).replace(/"(-?\d+)n"/g, (_, a) => a)
        )
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

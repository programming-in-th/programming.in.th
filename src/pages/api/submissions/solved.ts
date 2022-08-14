import type { NextApiRequest, NextApiResponse } from 'next'

import { Prisma } from '@prisma/client'

import prisma from '@/lib/prisma'
import { methodNotAllowed, send } from '@/utils/response'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const solved = await prisma.$queryRaw(
      Prisma.sql`SELECT COUNT(DISTINCT "userId"), "taskId" FROM "Submission" WHERE "score" = 100 GROUP BY "taskId"`
    )

    return send(
      res,
      JSON.stringify(solved, (_, v) =>
        typeof v === 'bigint' ? `${v}n` : v
      ).replace(/"(-?\d+)n"/g, (_, a) => a)
    )
  }

  return methodNotAllowed(res, ['GET'])
}

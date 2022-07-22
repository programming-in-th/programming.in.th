import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function taskHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { cursor, limit }
  } = req

  switch (method) {
    case 'GET':
      const task = await prisma.task.findMany({
        take: limit ? Number(limit) : undefined,
        cursor: cursor
          ? {
              id: cursor as string
            }
          : undefined,
        skip: cursor ? 1 : 0
      })
      res.status(200).json(task)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

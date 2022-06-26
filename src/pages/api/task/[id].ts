import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function taskHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method
  } = req

  switch (method) {
    case 'GET':
      const task = await prisma.task.findUnique({ where: { id: `${id}` } })
      res.status(200).json(task)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

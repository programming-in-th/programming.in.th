import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function taskHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id }
  } = req

  switch (method) {
    case 'GET':
      const submission = await prisma.submission.findUnique({
        where: { id: Number(id) }
      })
      res.status(200).json(submission)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

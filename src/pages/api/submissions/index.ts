import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { Session } from '@/types/tasks'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { taskId, code, language }
  } = req

  const session = (await unstable_getServerSession(
    req,
    res,
    authOptions
  )) as Session

  switch (method) {
    case 'PUT':
      if (!session) {
        res.status(401).end('Unauthorized')
      }
      const submission = await prisma.submission.create({
        data: {
          task: { connect: { id: taskId } },
          code: code,
          language: language,
          user: { connect: { id: session.user.id } }
        }
      })
      res.status(200).json(submission)
      break
    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

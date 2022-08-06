import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import prisma from '@/lib/prisma'

import { authOptions } from '../../auth/[...nextauth]'

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

      const bookmark = await prisma.bookmark.findUnique({
        where: {
          taskId_userId: {
            taskId: String(req.query.id),
            userId: session.user.id
          }
        }
      })

      res.status(200).json(bookmark !== null)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

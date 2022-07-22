import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'

import prisma from '@/lib/prisma'
import { authOptions } from '../auth/[...nextauth]'
import { Session } from 'next-auth'

enum Filter {
  ALL = 'all',
  TRIED = 'tried',
  SOLVED = 'solved'
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { filter }
  } = req

  const session = await unstable_getServerSession(req, res, authOptions)

  switch (method) {
    case 'GET':
      const task = await getTask(String(filter), session)
      res.status(200).json(task)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const getTask = async (filter: string = Filter.ALL, session: Session) => {
  if (session) {
    switch (filter) {
      case Filter.SOLVED:
        return await prisma.task.findMany({
          where: {
            Submission: {
              some: {
                score: {
                  equals: 100
                },
                user: {
                  email: { equals: session.user.email }
                }
              }
            }
          }
        })

      case Filter.TRIED:
        return await prisma.task.findMany({
          where: {
            Submission: {
              none: {
                score: {
                  equals: 100
                }
              },
              some: {
                user: {
                  email: { equals: session.user.email }
                }
              }
            }
          }
        })
      default:
    }
  }

  return await prisma.task.findMany()
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'

import prisma from '@/lib/prisma'
import { authOptions } from '../auth/[...nextauth]'
import { Session } from '@/types/tasks'

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

  const session = (await unstable_getServerSession(
    req,
    res,
    authOptions
  )) as Session

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
            Submissions: {
              some: {
                score: {
                  equals: 100
                },
                user: {
                  id: { equals: session.user.id }
                }
              }
            }
          }
        })

      case Filter.TRIED:
        return await prisma.task.findMany({
          where: {
            Submissions: {
              none: {
                score: {
                  equals: 100
                }
              },
              some: {
                user: {
                  id: { equals: session.user.id }
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

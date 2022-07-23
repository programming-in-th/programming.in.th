import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { Session } from '@/types/tasks'

enum Filter {
  OWN = 'own',
  TASK = 'task',
  OWN_TASK = 'own_task'
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { taskId, code, language },
    query
  } = req

  const session = (await unstable_getServerSession(
    req,
    res,
    authOptions
  )) as Session

  let submission

  switch (method) {
    case 'GET':
      if (
        (query.filter === Filter.OWN_TASK || query.filter === Filter.OWN) &&
        !session
      ) {
        res.status(401).end('Unauthorized')
      }

      submission = await getPersonalizedSubmission(
        String(query.filter),
        session,
        String(query.taskId)
      )

      res.status(200).json(submission)
    case 'PUT':
      if (!session) {
        res.status(401).end('Unauthorized')
      }

      try {
        submission = await prisma.submission.create({
          data: {
            task: { connect: { id: taskId } },
            code: code,
            language: language,
            user: { connect: { id: session.user.id } },
            groups: []
          }
        })
      } catch (_) {
        res.status(500)
      }

      res.status(201).json(submission)
      break
    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const getPersonalizedSubmission = async (
  filter: string,
  session: Session,
  taskId: string
) => {
  if (session) {
    if (filter === Filter.OWN) {
      return await prisma.submission.findMany({
        where: {
          user: {
            id: { equals: session.user.id }
          }
        }
      })
    } else if (filter === Filter.OWN_TASK) {
      if (taskId) {
        return await prisma.submission.findMany({
          where: {
            taskId: String(taskId),
            user: {
              id: { equals: session.user.id }
            }
          }
        })
      }
    } else if (filter === Filter.TASK) {
      return await prisma.submission.findMany({
        where: {
          taskId: String(taskId)
        }
      })
    }
  }

  if (filter === Filter.TASK) {
    return await prisma.submission.findMany({
      where: {
        taskId: String(taskId)
      }
    })
  }

  return await prisma.submission.findMany()
}

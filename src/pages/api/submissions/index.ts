import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { Session } from '@/types/tasks'
import compressCode from '@/lib/compressCode'

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

  switch (method) {
    case 'GET': {
      if (
        (query.filter === Filter.OWN_TASK || query.filter === Filter.OWN) &&
        !session
      ) {
        res.status(401).end('Unauthorized')
        break
      }

      const submission = await getPersonalizedSubmission(
        String(query.filter),
        session,
        String(query.taskId)
      )

      res.status(200).json(submission)
      break
    }
    case 'PUT': {
      if (!session) {
        res.status(401).end('Unauthorized')
        break
      }

      const compressedCode = await compressCode(JSON.stringify(code))

      try {
        const submission = await prisma.submission.create({
          data: {
            task: { connect: { id: taskId } },
            code: compressedCode,
            language: language,
            user: { connect: { id: session.user.id } },
            groups: []
          }
        })

        res.status(201).json(submission)
      } catch (_) {
        res.status(500)
      }
      break
    }
    default:
      res.setHeader('Allow', ['PUT', 'GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const getPersonalizedSubmission = async (
  filter: string,
  session: Session,
  taskId: string
) => {
  if (session) {
    switch (filter) {
      case Filter.OWN:
        return await prisma.submission.findMany({
          orderBy: [
            {
              submittedAt: 'desc'
            }
          ],
          where: {
            user: {
              id: { equals: session.user.id }
            }
          },
          select: {
            id: true,
            score: true,
            user: true,
            language: true,
            time: true,
            memory: true,
            submittedAt: true
          }
        })
      case Filter.OWN_TASK:
        return await prisma.submission.findMany({
          orderBy: [
            {
              submittedAt: 'desc'
            }
          ],
          where: {
            taskId: String(taskId),
            user: {
              id: { equals: session.user.id }
            }
          },
          select: {
            id: true,
            score: true,
            user: true,
            language: true,
            time: true,
            memory: true,
            submittedAt: true
          }
        })

      case Filter.TASK:
        return await prisma.submission.findMany({
          orderBy: [
            {
              submittedAt: 'desc'
            }
          ],
          where: {
            taskId: String(taskId)
          },
          select: {
            id: true,
            score: true,
            user: true,
            language: true,
            time: true,
            memory: true,
            submittedAt: true
          }
        })
    }
  }

  if (filter === Filter.TASK) {
    return await prisma.submission.findMany({
      orderBy: [
        {
          submittedAt: 'desc'
        }
      ],
      where: {
        taskId: String(taskId)
      },
      select: {
        id: true,
        score: true,
        user: true,
        language: true,
        time: true,
        memory: true,
        submittedAt: true
      }
    })
  }

  return await prisma.submission.findMany({
    orderBy: [
      {
        submittedAt: 'desc'
      }
    ]
  })
}

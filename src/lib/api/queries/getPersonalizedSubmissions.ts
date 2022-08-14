import { Session } from 'next-auth'

import prisma from '@/lib/prisma'

export const getPersonalizedSubmission = async (
  filter: string[],
  session: Session,
  taskId: string
) => {
  if (session) {
    return await prisma.submission.findMany({
      where: {
        ...(filter.includes(Filter.OWN) && {
          user: { id: { equals: session.user.id } }
        }),
        ...(filter.includes(Filter.TASK) && { taskId })
      },
      orderBy: [
        {
          submittedAt: 'desc'
        }
      ],
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

export enum Filter {
  OWN = 'own',
  TASK = 'task'
}

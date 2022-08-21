import { Session } from 'next-auth'

import prisma from '@/lib/prisma'

import { SubmissionFilterEnum as Filter } from '../schema/submissions'

export const getFilteredSubmissions = async (
  filter: string[],
  taskId?: string,
  session?: Session
) => {
  if (session) {
    return await prisma.submission.findMany({
      where: {
        ...(filter.includes(Filter.enum.own) && {
          user: { id: { equals: session.user.id! } }
        }),
        ...(filter.includes(Filter.enum.task) && { taskId }),
        task: { private: false }
      },
      orderBy: [
        {
          submittedAt: 'desc'
        }
      ],
      select: {
        id: true,
        score: true,
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

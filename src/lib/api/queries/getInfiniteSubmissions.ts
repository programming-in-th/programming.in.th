import prisma from '@/lib/prisma'

import { SubmissionFilterEnum as Filter } from '../schema/submissions'

export const getInfiniteSubmissions = async (
  filter?: string[],
  limit?: number,
  cursor?: number,
  taskId?: string,
  userId?: string
) => {
  const submissions = await prisma.submission.findMany({
    take: limit,
    ...(cursor && { skip: 1, cursor: { id: cursor } }),
    orderBy: [
      {
        id: 'desc'
      }
    ],
    where: {
      ...(filter?.includes(Filter.enum.task) && { taskId }),
      ...(filter?.includes(Filter.enum.user) &&
        userId && {
          user: { id: { equals: userId } }
        })
    },
    select: {
      id: true,
      score: true,
      user: {
        select: {
          username: true,
          id: true
        }
      },
      language: true,
      time: true,
      memory: true,
      submittedAt: true
    }
  })

  const nextCursor =
    submissions.length > 0 ? submissions[submissions.length - 1].id : null

  return { data: submissions, nextCursor }
}

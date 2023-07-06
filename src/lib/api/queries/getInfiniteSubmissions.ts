import { Prisma } from '@prisma/client'

import prisma from '@/lib/prisma'
import { IListSubmission } from '@/types/submissions'

import { SubmissionFilterEnum as Filter } from '../schema/submissions'

export type filterOptions = {
  taskId?: string
  assessmentId?: string
  userId?: string
}

export const getInfiniteSubmissions = async (
  filter?: string[],
  limit?: number,
  cursor?: number,
  options?: filterOptions,
  where?: Prisma.SubmissionWhereInput
): Promise<{ data: IListSubmission[]; nextCursor: number | null }> => {
  const submissions = await prisma.submission.findMany({
    take: limit,
    ...(cursor && { skip: 1, cursor: { id: cursor } }),
    orderBy: [
      {
        id: 'desc'
      }
    ],
    where: {
      ...(filter?.includes(Filter.enum.task) && { taskId: options?.taskId }),
      ...((filter?.includes(Filter.enum.user) ||
        filter?.includes(Filter.enum.own)) && {
        user: { id: { equals: options?.userId } }
      }),
      ...(filter?.includes(Filter.enum.assessment) && {
        assessmentId: options?.assessmentId
      }),
      ...where
    },
    select: {
      taskId: true,
      id: true,
      score: true,
      user: {
        select: {
          username: true,
          name: true,
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

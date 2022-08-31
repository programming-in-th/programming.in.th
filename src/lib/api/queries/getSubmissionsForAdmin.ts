import prisma from '@/lib/prisma'

import { SubmissionFilterEnum as Filter } from '../schema/submissions'

export const getSubmissionsForAdmin = async (
  filter: string[],
  limit?: number,
  taskId?: string,
  userId?: string,
  assessmentId?: string
) => {
  return await prisma.submission.findMany({
    take: limit,
    where: {
      ...(filter.includes(Filter.enum.task) && { taskId }),
      ...(filter.includes(Filter.enum.assessment) && { assessmentId }),
      ...(filter.includes(Filter.enum.user) && { userId })
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

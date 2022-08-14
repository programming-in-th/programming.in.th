import prisma from '@/lib/prisma'

export const getInfiniteSubmission = async (
  taskId: string,
  cursor: number,
  limit: number
) => {
  if (cursor) {
    const submissions = await prisma.submission.findMany({
      take: limit,
      skip: 1,
      cursor: {
        id: cursor
      },
      orderBy: [
        {
          id: 'desc'
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

    const nextCursor = submissions[submissions.length - 1].id

    return { data: submissions, nextCursor }
  } else {
    const submissions = await prisma.submission.findMany({
      take: limit,
      orderBy: [
        {
          id: 'desc'
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

    const nextCursor = submissions[submissions.length - 1].id

    return { data: submissions, nextCursor }
  }
}

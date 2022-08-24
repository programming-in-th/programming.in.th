import prisma from '@/lib/prisma'

export const getAllTaskForUser = async (userId: string) => {
  const tasks = await prisma.task.findMany({
    where: {
      OR: [
        {
          taskOnAssessment: {
            some: {
              assessment: {
                is: {
                  users: { some: { userId } },
                  archived: false
                }
              }
            }
          }
        },
        { private: false }
      ]
    },
    select: { id: true }
  })

  return tasks.map(task => task.id)
}

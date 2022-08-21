import prisma from '@/lib/prisma'

const checkUserPermissionOnTask = async (userId: string, taskId: string) => {
  const taskOnAssessment = await prisma.userOnAssessment.findMany({
    where: {
      userId: userId,
      assessment: {
        is: {
          open: {
            lte: new Date()
          },
          close: {
            gte: new Date()
          },
          OR: {
            private: false
          }
        }
      }
    },
    select: {
      assessment: {
        select: { tasks: { where: { taskId: taskId } } }
      }
    }
  })

  return taskOnAssessment.some(task => task.assessment.tasks.length > 0)
}

export default checkUserPermissionOnTask

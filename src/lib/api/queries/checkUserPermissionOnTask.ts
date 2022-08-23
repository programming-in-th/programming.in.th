import prisma from '@/lib/prisma'

const checkUserPermissionOnTask = async (
  userId: string,
  taskId: string,
  interaction: 'READ' | 'WRITE' = 'READ'
) => {
  if (interaction === 'WRITE') {
    const taskOnAssessment = await prisma.userOnAssessment.findMany({
      where: {
        userId: userId,
        assessment: {
          OR: [
            {
              AND: [
                { open: { lte: new Date() } },
                { close: { gte: new Date() } }
              ]
            },
            { archived: false }
          ],
          tasks: {
            some: { taskId: { equals: taskId } }
          }
        }
      },
      select: {
        assessment: {
          select: {
            tasks: { select: { taskId: true } }
          }
        }
      }
    })

    return taskOnAssessment.length > 0
  }

  const taskOnAssessment = await prisma.userOnAssessment.findMany({
    where: {
      userId: userId,
      assessment: {
        OR: [{ archived: false }],
        tasks: {
          some: { taskId: { equals: taskId } }
        }
      }
    },
    select: {
      assessment: {
        select: {
          tasks: { select: { taskId: true } }
        }
      }
    }
  })

  return taskOnAssessment.length > 0
}

export default checkUserPermissionOnTask

import { Session } from 'next-auth'

import prisma from '@/lib/prisma'

const checkUserPermissionOnTask = async (
  session: Session,
  taskId: string,
  interaction: 'READ' | 'WRITE' = 'READ'
) => {
  if (session.user.admin) return true

  if (interaction === 'WRITE') {
    const taskOnAssessment = await prisma.userOnAssessment.findMany({
      where: {
        userId: session.user.id!,
        assessment: {
          AND: [
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
      userId: session.user.id!,
      assessment: {
        archived: false,
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

import { Session } from 'next-auth'

import prisma from '@/lib/prisma'

const checkUserPermissionOnTask = async (
  session: Session | Session['user'],
  taskId: string,
  interaction: 'READ' | 'WRITE' = 'READ'
) => {
  const user = 'user' in session ? session.user : session

  if (user.admin) return true

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: { private: true, id: true }
  })

  if (!task?.private) return true

  if (!user.id) return false

  if (interaction === 'WRITE') {
    const taskOnAssessment = await prisma.userOnAssessment.findMany({
      where: {
        userId: user.id,
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
      userId: user.id,
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

import { Session } from 'next-auth'

import prisma from '@/lib/prisma'

const checkOwnerPermissionOnAssessment = async (
  session: Session | Session['user'],
  assessmentId?: string | null
) => {
  const user = 'user' in session ? session.user : session

  if (user.admin) return true
  if (!assessmentId) return false

  if (!user.id) return false

  const ownerOnAssessment = await prisma.ownerOnAssessment.findUnique({
    where: {
      userId_assessmentId: {
        userId: user.id,
        assessmentId: assessmentId
      }
    }
  })

  return ownerOnAssessment !== null
}

export default checkOwnerPermissionOnAssessment

export const checkOwnerPermission = async (userId: string) => {
  const ownerOnAssessment = await prisma.ownerOnAssessment.findFirst({
    where: { userId },
    select: { userId: true }
  })

  return ownerOnAssessment !== null
}

export const checkOwnerPermissionOnTask = async (
  userId: string,
  taskId: string
) => {
  try {
    await prisma.ownerOnAssessment.findFirstOrThrow({
      where: {
        userId,
        assessment: {
          tasks: {
            some: { taskId: { equals: taskId } }
          }
        }
      },
      select: { userId: true }
    })

    return true
  } catch {
    return false
  }
}

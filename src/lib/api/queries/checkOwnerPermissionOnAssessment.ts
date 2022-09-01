import { Session } from 'next-auth'

import prisma from '@/lib/prisma'

const checkOwnerPermissionOnAssessment = async (
  session: Session,
  assessmentId?: string | null
) => {
  if (session.user.admin) return true
  if (!assessmentId) return false

  const ownerOnAssessment = await prisma.ownerOnAssessment.findUnique({
    where: {
      userId_assessmentId: {
        userId: session.user.id!,
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

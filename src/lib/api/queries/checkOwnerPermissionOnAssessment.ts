import prisma from '@/lib/prisma'

const checkOwnerPermissionOnAssessment = async (
  userId: string,
  assessmentId: string
) => {
  const ownerOnAssessment = await prisma.ownerOnAssessment.findUnique({
    where: {
      userId_assessmentId: {
        userId: userId,
        assessmentId: assessmentId
      }
    }
  })

  return ownerOnAssessment !== null
}

export default checkOwnerPermissionOnAssessment

import prisma from '@/lib/prisma'

const isAdmin = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { admin: true }
  })

  return user?.admin
}

export default isAdmin

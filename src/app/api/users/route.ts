import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'
import { forbidden, json, unauthorized } from '@/utils/apiResponse'

export async function GET() {
  const user = await getServerUser()

  if (!user) {
    return unauthorized()
  }

  if (!user.admin) {
    return forbidden()
  }

  const pUser = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      email: true
    }
  })

  return json(pUser)
}

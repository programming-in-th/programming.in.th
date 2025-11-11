import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'
import { json } from '@/utils/apiResponse'

export async function GET() {
  const user = await getServerUser()

  if (!user || !user.id) {
    return json([])
  }

  return json(
    (await prisma.$queryRaw`SELECT task_id, max(score) FROM submission WHERE user_id = ${user?.id} GROUP BY task_id;`) as Array<{
      task_id: string
      max: number
    }>
  )
}

import { getAllTaskForUser } from '@/lib/api/queries/getAllTaskForUser'
import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'
import { json, unauthorized } from '@/utils/apiResponse'

export async function GET() {
  const user = await getServerUser()

  if (!user) return unauthorized()
  if (!user.id) return unauthorized('User ID not found')

  const maxScore =
    (await prisma.$queryRaw`SELECT task_id, max(score) FROM submission WHERE user_id = ${user.id} GROUP BY task_id;`) as Array<{
      taskId: string
      max: number
    }>

  if (user.admin) {
    return json(maxScore)
  }

  const usersTasks = await getAllTaskForUser(user.id)
  const filteredMaxScore = maxScore.filter(ms => usersTasks.includes(ms.taskId))

  return json(filteredMaxScore)
}

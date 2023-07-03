import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'
import { json } from '@/utils/apiResponse'

export async function GET() {
  const user = await getServerUser()

  if (!user || !user.id) {
    return json([])
  }

  const rawBookmark = await prisma.bookmark.findMany({
    where: {
      user: {
        id: { equals: user?.id }
      }
    }
  })

  return json(rawBookmark.map(bookmark => bookmark.taskId))
}

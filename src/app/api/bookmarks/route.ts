import { NextRequest } from 'next/server'

import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'
import { json } from '@/utils/apiResponse'

export async function GET(_: NextRequest) {
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

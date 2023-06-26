import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'

export async function GET(_: NextRequest) {
  const user = await getServerUser()

  if (!user || !user.id) {
    return NextResponse.json([], { status: 200 })
  }

  const rawBookmark = await prisma.bookmark.findMany({
    where: {
      user: {
        id: { equals: user?.id }
      }
    }
  })

  return NextResponse.json(
    rawBookmark.map(bookmark => bookmark.taskId),
    { status: 200 }
  )
}

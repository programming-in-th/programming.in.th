import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function GET() {
  const solved =
    await prisma.$queryRaw`SELECT COUNT(DISTINCT submission.user_id), submission.task_id FROM submission INNER JOIN task ON submission.task_id = task.id WHERE submission.score = 100 AND NOT task.private GROUP BY submission.task_id`

  return new NextResponse(
    JSON.stringify(solved, (_, v) =>
      typeof v === 'bigint' ? `${v}n` : v
    ).replace(/"(-?\d+)n"/g, (_, a) => a)
  )
}

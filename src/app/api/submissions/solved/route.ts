import { NextResponse } from 'next/server'

import { Prisma } from '@prisma/client'

import prisma from '@/lib/prisma'

export async function GET() {
  const solved = await prisma.$queryRaw(
    Prisma.sql`SELECT COUNT(DISTINCT user_id), task_id FROM submission WHERE score = 100 GROUP BY task_id`
  )

  return new NextResponse(
    JSON.stringify(solved, (_, v) =>
      typeof v === 'bigint' ? `${v}n` : v
    ).replace(/"(-?\d+)n"/g, (_, a) => a)
  )
}

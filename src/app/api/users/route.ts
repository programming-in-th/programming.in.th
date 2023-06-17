import { NextResponse } from 'next/server'

import { checkOwnerPermission } from '@/lib/api/queries/checkOwnerPermissionOnAssessment'
import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'

export async function GET() {
  const user = await getServerUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!user.admin && !(user.id && (await checkOwnerPermission(user.id)))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const pUser = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true
    }
  })

  return NextResponse.json(pUser)
}

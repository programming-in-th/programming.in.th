import { NextRequest } from 'next/server'

import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'
import {
  forbidden,
  internalServerError,
  json,
  unauthorized
} from '@/utils/apiResponse'

export async function PATCH(
  _: NextRequest,
  ctx: RouteContext<'/api/tasks/[id]/status'>
) {
  const params = await ctx.params
  const user = await getServerUser()

  if (!user) {
    return unauthorized()
  }

  if (!user.admin) {
    return forbidden()
  }

  const id = params.id

  try {
    const result = await prisma.testcaseSyncStatus.upsert({
      where: { taskId: id },
      update: {
        syncStatus: 'PENDING'
      },
      create: {
        taskId: id,
        syncStatus: 'PENDING',
        lastSynced: new Date(0)
      }
    })
    return json(result)
  } catch (err) {
    console.log(err)
    return internalServerError()
  }
}

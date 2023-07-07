import { NextRequest } from 'next/server'

import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'
import { badRequest, forbidden, json, unauthorized } from '@/utils/apiResponse'

import { filterName } from './filterName'
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const reqUser = await getServerUser()

  if (!reqUser || !reqUser.id) return unauthorized()

  const userId = searchParams.get('userId') ?? reqUser.id

  if (userId !== reqUser.id && !reqUser.admin) {
    return forbidden()
  }

  const body = await req.json()

  if (!('displayName' in body) || typeof body.displayName !== 'string') {
    return badRequest('displayName is required')
  }

  const displayName = filterName(body.displayName)

  if (displayName.length < 3 || displayName.length > 32) {
    return badRequest('displayName must be between 3 and 32 characters')
  }

  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      name: displayName
    }
  })

  return json({ success: true })
}

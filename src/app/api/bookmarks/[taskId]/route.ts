import { NextRequest } from 'next/server'

import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'
import { badRequest, json, unauthorized } from '@/utils/apiResponse'

export async function GET(
  _: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const user = await getServerUser()

  if (!user || !user.id) {
    return unauthorized()
  }

  const taskId = params.taskId

  if (!taskId) {
    return badRequest()
  }

  const bookmark = await prisma.bookmark.findUnique({
    where: {
      taskId_userId: {
        taskId: taskId,
        userId: user.id
      }
    }
  })

  return json(bookmark !== null)
}

export async function POST(
  _: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const user = await getServerUser()

  if (!user || !user.id) {
    return unauthorized()
  }

  const taskId = params.taskId

  if (!taskId) {
    return badRequest()
  }

  const bookmark = await prisma.bookmark.create({
    data: {
      task: { connect: { id: taskId } },
      user: { connect: { id: user.id } }
    }
  })

  return json(bookmark)
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const user = await getServerUser()

  if (!user || !user.id) {
    return unauthorized()
  }

  const taskId = params.taskId

  if (!taskId) {
    return badRequest()
  }

  const bookmark = await prisma.bookmark.delete({
    where: {
      taskId_userId: {
        taskId,
        userId: user.id
      }
    }
  })

  return json(bookmark)
}

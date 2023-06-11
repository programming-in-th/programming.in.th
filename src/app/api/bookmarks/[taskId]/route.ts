import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'

export async function GET(
  _: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const user = await getServerUser()

  if (!user || !user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const taskId = params.taskId

  if (!taskId) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
  }

  const bookmark = await prisma.bookmark.findUnique({
    where: {
      taskId_userId: {
        taskId: taskId,
        userId: user.id
      }
    }
  })

  return NextResponse.json(bookmark !== null, { status: 200 })
}

export async function POST(
  _: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const user = await getServerUser()

  if (!user || !user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const taskId = params.taskId

  if (!taskId) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
  }

  const bookmark = await prisma.bookmark.create({
    data: {
      task: { connect: { id: taskId } },
      user: { connect: { id: user.id } }
    }
  })

  return NextResponse.json(bookmark, { status: 200 })
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const user = await getServerUser()

  if (!user || !user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const taskId = params.taskId

  if (!taskId) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
  }

  const bookmark = await prisma.bookmark.delete({
    where: {
      taskId_userId: {
        taskId,
        userId: user.id
      }
    }
  })

  return NextResponse.json(bookmark, { status: 200 })
}

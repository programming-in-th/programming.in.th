import { notFound } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

import { GetObjectCommand } from '@aws-sdk/client-s3'

import checkUserPermissionOnTask from '@/lib/api/queries/checkUserPermissionOnTask'
import prisma from '@/lib/prisma'
import { s3Client } from '@/lib/s3Client'
import { getServerUser } from '@/lib/session'
import { forbidden, unauthorized } from '@/utils/apiResponse'

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id

  const task = await prisma.task.findUnique({
    where: { id },
    select: {
      id: true,
      private: true,
      statement: true
    }
  })

  if (!task) return notFound()

  if (task.private) {
    const user = await getServerUser()

    if (!user) {
      return unauthorized()
    }

    if (!(await checkUserPermissionOnTask(user, task.id))) {
      return forbidden()
    }
  }

  try {
    const response = await s3Client.send(
      new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `statements/attachments/${id}.zip`
      })
    )

    return new NextResponse(response.Body as ReadableStream, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `inline; attachment; filename=${id}.zip`
      }
    })
  } catch {
    return notFound()
  }
}

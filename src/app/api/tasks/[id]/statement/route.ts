import { Readable } from 'node:stream'

import { notFound } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

import { GetObjectCommand } from '@aws-sdk/client-s3'

import checkUserPermissionOnTask from '@/lib/api/queries/checkUserPermissionOnTask'
import prisma from '@/lib/prisma'
import { mdxToHtml } from '@/lib/renderMarkdown'
import { s3Client } from '@/lib/s3Client'
import { getServerUser } from '@/lib/session'
import { forbidden, json, unauthorized } from '@/utils/apiResponse'
import streamToString from '@/utils/streamToString'

export async function GET(
  _: NextRequest,
  ctx: RouteContext<'/api/tasks/[id]/statement'>
) {
  const params = await ctx.params
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

  if (task.statement === 'PDF') {
    try {
      const response = await s3Client.send(
        new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: `statements/pdf/${id}.pdf`
        })
      )

      return new NextResponse(response.Body as ReadableStream, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; attachment; filename=${id}.pdf`
        }
      })
    } catch {
      return notFound()
    }
  } else if (task.statement === 'MARKDOWN') {
    try {
      const response = await s3Client.send(
        new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: `statements/markdown/${id}.mdx`
        })
      )

      const body = response.Body as Readable
      const text = await streamToString(body)

      if (!body) return notFound()

      const rendered = await mdxToHtml(text)

      return json(rendered)
    } catch {
      return notFound()
    }
  }
}

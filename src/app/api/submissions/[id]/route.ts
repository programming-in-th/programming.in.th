import { notFound } from 'next/navigation'
import { NextRequest } from 'next/server'

import checkUserPermissionOnSubmission from '@/lib/api/queries/checkUserPermissionOnSubmission'
import { decompressCode } from '@/lib/codeTransformer'
import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'
import { forbidden, json, unauthorized } from '@/utils/apiResponse'

export async function GET(
  _: NextRequest,
  ctx: RouteContext<'/api/submissions/[id]'>
) {
  const params = await ctx.params
  const id = params.id

  const submission = await prisma.submission.findUnique({
    where: { id: +id },
    select: {
      id: true,
      status: true,
      submittedAt: true,
      time: true,
      memory: true,
      score: true,
      groups: true,
      language: true,
      user: {
        select: {
          username: true,
          name: true,
          id: true
        }
      },
      task: {
        select: {
          id: true,
          private: true
        }
      },
      code: true,
      assessmentId: true,
      private: true
    }
  })

  if (!submission) {
    return notFound()
  }

  if (submission.task.private || submission.private) {
    const user = await getServerUser()

    if (!user) return unauthorized()
    if (!user.id) return unauthorized('User ID not found')

    if (
      !(await checkUserPermissionOnSubmission(user, {
        userId: submission.user?.id,
        taskId: submission.task.id,
        assessmentId: submission.assessmentId
      }))
    ) {
      return forbidden()
    }
  }

  const { private: _private, ...rest } = submission
  const payload = {
    ...rest,
    code: await decompressCode(Buffer.from(rest.code))
  }

  return json(payload)
}

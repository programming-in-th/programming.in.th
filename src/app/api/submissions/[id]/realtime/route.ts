import { notFound } from 'next/navigation'
import { NextRequest } from 'next/server'

import checkUserPermissionOnSubmission from '@/lib/api/queries/checkUserPermissionOnSubmission'
import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'
import { forbidden, json, unauthorized } from '@/utils/apiResponse'

export async function GET(
  _: NextRequest,
  ctx: RouteContext<'/api/submissions/[id]/realtime'>
) {
  const params = await ctx.params
  const id = params.id

  const submission = await prisma.submission.findUnique({
    where: { id: +id },
    select: {
      id: true,
      status: true,
      score: true,
      groups: true,
      userId: true,
      assessmentId: true,
      private: true,
      task: {
        select: {
          id: true,
          private: true
        }
      }
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
        userId: submission.userId,
        taskId: submission.task.id,
        assessmentId: submission.assessmentId
      }))
    ) {
      return forbidden()
    }
  }

  const { id: submissionId, status, score, groups } = submission
  const payload = { id: submissionId, status, score, groups }

  return json(payload)
}

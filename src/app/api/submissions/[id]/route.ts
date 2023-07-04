import { notFound } from 'next/navigation'
import { NextRequest } from 'next/server'

import checkOwnerPermissionOnAssessment from '@/lib/api/queries/checkOwnerPermissionOnAssessment'
import checkUserPermissionOnTask from '@/lib/api/queries/checkUserPermissionOnTask'
import { decompressCode } from '@/lib/codeTransformer'
import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'
import { forbidden, json, unauthorized } from '@/utils/apiResponse'

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
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
      assessmentId: true
    }
  })

  if (!submission) {
    return notFound()
  }

  if (submission.task?.private) {
    const user = await getServerUser()

    if (!user) return unauthorized()
    if (!user.id) return unauthorized('User ID not found')

    if (
      !(
        ((await checkUserPermissionOnTask(user, submission.task.id)) &&
          submission?.user?.id === user.id) ||
        user.admin ||
        (await checkOwnerPermissionOnAssessment(user, submission.assessmentId))
      )
    ) {
      return forbidden()
    }
  }

  const payload = {
    ...submission,
    code: await decompressCode(submission.code)
  }

  return json(payload)
}

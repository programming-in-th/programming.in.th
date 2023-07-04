import { notFound } from 'next/navigation'
import { NextRequest } from 'next/server'

import checkUserPermissionOnTask from '@/lib/api/queries/checkUserPermissionOnTask'
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
      score: true,
      groups: true,

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

  if (submission.task?.private) {
    const user = await getServerUser()

    if (!user) return unauthorized()
    if (!user.id) return unauthorized('User ID not found')

    if (!(await checkUserPermissionOnTask(user, submission.task.id))) {
      return forbidden()
    }
  }

  const payload: DeepPartial<typeof submission> = submission

  delete payload.task

  return json(payload)
}

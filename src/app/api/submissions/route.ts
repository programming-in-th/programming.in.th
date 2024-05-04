import { notFound } from 'next/navigation'
import { NextRequest } from 'next/server'

import checkOwnerPermissionOnAssessment, {
  checkOwnerPermissionOnTask
} from '@/lib/api/queries/checkOwnerPermissionOnAssessment'
import checkUserPermissionOnTask from '@/lib/api/queries/checkUserPermissionOnTask'
import { getInfiniteSubmissions } from '@/lib/api/queries/getInfiniteSubmissions'
import { paramsToObject } from '@/lib/api/schema/searchParams'
import {
  SubmissionSchema,
  SubmissionFilterEnum as Filter,
  SubmitSchema
} from '@/lib/api/schema/submissions'
import { compressCode } from '@/lib/codeTransformer'
import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'
import { badRequest, forbidden, json, unauthorized } from '@/utils/apiResponse'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const parsedQuery = SubmissionSchema.safeParse(paramsToObject(searchParams))

  if (!parsedQuery.success) {
    return badRequest()
  }

  const { taskId, assessmentId, userId, cursor, limit, filter } =
    parsedQuery.data

  const user = await getServerUser()

  const filterArr = filter ? (Array.isArray(filter) ? filter : [filter]) : []

  if (filterArr.includes(Filter.enum.own) && !user) {
    return json({ data: [], nextCursor: null })
  }

  if (
    filterArr.includes(Filter.enum.own) &&
    filterArr.includes(Filter.enum.user)
  ) {
    return badRequest()
  }

  if (
    (filterArr.includes(Filter.enum.assessment) && !assessmentId) ||
    (filterArr.includes(Filter.enum.task) && !taskId) ||
    (filterArr.includes(Filter.enum.user) && !userId)
  ) {
    return badRequest()
  }

  if (filterArr.includes(Filter.enum.task)) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      select: { private: true, id: true }
    })

    if (!task) return notFound()

    if (task.private) {
      if (!user) return unauthorized()
      if (!user.id) return unauthorized('User ID not found')

      if (!(await checkUserPermissionOnTask(user, task.id))) {
        return forbidden()
      }

      const isAdminOrOwner =
        user.admin || (await checkOwnerPermissionOnTask(user.id, task.id))

      const infiniteSubmission = await getInfiniteSubmissions(
        filterArr,
        limit,
        cursor,
        {
          taskId,
          assessmentId: isAdminOrOwner ? assessmentId : undefined,
          userId: filterArr.includes(Filter.enum.own)
            ? user.id
            : isAdminOrOwner
              ? userId
              : ''
        }
      )

      return json(infiniteSubmission)
    }

    const infiniteSubmissions = await getInfiniteSubmissions(
      filterArr,
      limit,
      cursor,
      {
        taskId,
        userId: filterArr.includes(Filter.enum.own)
          ? user?.id ?? ''
          : user?.admin
            ? userId
            : ''
      }
    )

    return json(infiniteSubmissions)
  }

  if (filterArr.includes(Filter.enum.assessment)) {
    if (!user) return unauthorized()

    const isAdminOrOwner =
      user.admin || (await checkOwnerPermissionOnAssessment(user, assessmentId))

    if (!isAdminOrOwner) return forbidden()

    const infiniteSubmissions = await getInfiniteSubmissions(
      filterArr,
      limit,
      cursor,
      {
        taskId,
        assessmentId,
        userId: filterArr.includes(Filter.enum.own) ? user.id ?? '' : userId
      }
    )

    return json(infiniteSubmissions)
  }

  const infiniteSubmissions = await getInfiniteSubmissions(
    filterArr,
    limit,
    cursor,
    {
      userId: filterArr.includes(Filter.enum.own)
        ? user?.id ?? ''
        : user?.admin
          ? userId
          : undefined
    },
    {
      ...(!user?.admin && { private: false })
    }
  )

  return json(infiniteSubmissions)
}

export async function POST(req: NextRequest) {
  const user = await getServerUser()

  if (!user) return unauthorized()
  if (!user.id) return unauthorized('User ID not found')

  const parsedBody = SubmitSchema.safeParse(await req.json())

  if (!parsedBody.success) {
    return badRequest()
  }
  const { assessmentId, taskId, language, code } = parsedBody.data

  if (!(await checkUserPermissionOnTask(user, taskId))) {
    return forbidden()
  }

  const compressedCode = await compressCode(JSON.stringify(code))

  const submission = await prisma.submission.create({
    data: {
      task: { connect: { id: taskId } },
      code: compressedCode,
      language,
      user: { connect: { id: user.id } },
      ...(assessmentId && {
        assessment: { connect: { id: assessmentId } },
        private: true
      })
    }
  })

  return json({
    ...submission,
    code,
    taskId: undefined,
    private: undefined,
    userId: undefined,
    user: {
      username: user.username,
      id: user.id
    },
    task: {
      id: taskId,
      private: submission.private
    }
  })
}

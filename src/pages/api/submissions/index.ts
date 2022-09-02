import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import checkOwnerPermissionOnAssessment, {
  checkOwnerPermissionOnTask
} from '@/lib/api/queries/checkOwnerPermissionOnAssessment'
import checkUserPermissionOnTask from '@/lib/api/queries/checkUserPermissionOnTask'
import { getInfiniteSubmissions } from '@/lib/api/queries/getInfiniteSubmissions'
import {
  SubmissionSchema,
  SubmissionFilterEnum as Filter,
  SubmitSchema
} from '@/lib/api/schema/submissions'
import { compressCode } from '@/lib/codeTransformer'
import prisma from '@/lib/prisma'
import {
  unauthorized,
  methodNotAllowed,
  ok,
  badRequest,
  forbidden
} from '@/utils/response'

import { authOptions } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { query } = req

    const parsedQuery = SubmissionSchema.safeParse(query)

    if (!parsedQuery.success) {
      return badRequest(res)
    }

    const { taskId, assessmentId, userId, cursor, limit, filter } =
      parsedQuery.data

    const session = await unstable_getServerSession(req, res, authOptions)

    const filterArr = filter ? (Array.isArray(filter) ? filter : [filter]) : []

    if (filterArr.includes(Filter.enum.own) && !session) {
      return unauthorized(res)
    }

    if (
      filterArr.includes(Filter.enum.own) &&
      filterArr.includes(Filter.enum.user)
    ) {
      return badRequest(res)
    }

    if (
      (filterArr.includes(Filter.enum.assessment) && !assessmentId) ||
      (filterArr.includes(Filter.enum.task) && !taskId) ||
      (filterArr.includes(Filter.enum.user) && !userId)
    ) {
      return badRequest(res)
    }

    if (filterArr.includes(Filter.enum.task)) {
      const task = await prisma.task.findUnique({
        where: { id: taskId },
        select: { private: true, id: true }
      })

      if (!task) return badRequest(res, '405: Task not found')

      if (task.private) {
        if (!session) return unauthorized(res)

        if (!(await checkUserPermissionOnTask(session, task.id))) {
          return forbidden(res)
        }

        const isAdminOrOwner =
          session.user.admin ||
          (await checkOwnerPermissionOnTask(session.user.id!, task.id))

        const infiniteSubmission = await getInfiniteSubmissions(
          filterArr,
          limit,
          cursor,
          {
            taskId,
            assessmentId: isAdminOrOwner ? assessmentId : undefined,
            userId: filterArr.includes(Filter.enum.own)
              ? session.user.id!
              : isAdminOrOwner
              ? userId
              : ''
          }
        )

        return ok(res, infiniteSubmission)
      }

      const infiniteSubmissions = await getInfiniteSubmissions(
        filterArr,
        limit,
        cursor,
        {
          taskId,
          userId: filterArr.includes(Filter.enum.own)
            ? session?.user.id!
            : session?.user.admin
            ? userId
            : ''
        }
      )

      return ok(res, infiniteSubmissions)
    }

    if (filterArr.includes(Filter.enum.assessment)) {
      if (!session) return unauthorized(res)

      const isAdminOrOwner =
        session.user.admin ||
        (await checkOwnerPermissionOnAssessment(session, assessmentId))

      if (!isAdminOrOwner) return forbidden(res)

      const infiniteSubmissions = await getInfiniteSubmissions(
        filterArr,
        limit,
        cursor,
        {
          taskId,
          assessmentId,
          userId: filterArr.includes(Filter.enum.own)
            ? session?.user.id!
            : userId
        }
      )

      return ok(res, infiniteSubmissions)
    }

    const infiniteSubmissions = await getInfiniteSubmissions(
      filterArr,
      limit,
      cursor,
      {
        userId: filterArr.includes(Filter.enum.own)
          ? session?.user.id!
          : session?.user.admin
          ? userId
          : undefined
      },
      {
        ...(!session?.user.admin && { private: false })
      }
    )

    return ok(res, infiniteSubmissions)
  } else if (req.method === 'POST') {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      return unauthorized(res)
    }

    const { body } = req

    const parsedBody = SubmitSchema.safeParse(body)

    if (!parsedBody.success) {
      return badRequest(res)
    }
    const { assessmentId, taskId, language, code } = parsedBody.data

    if (!(await checkUserPermissionOnTask(session, taskId, 'WRITE'))) {
      return forbidden(res)
    }

    const compressedCode = await compressCode(JSON.stringify(code))

    const submission = await prisma.submission.create({
      data: {
        task: { connect: { id: taskId } },
        code: compressedCode,
        language,
        user: { connect: { id: session.user.id! } },
        ...(assessmentId && {
          assessment: { connect: { id: assessmentId } },
          private: true
        })
      }
    })

    return ok(res, submission)
  }

  return methodNotAllowed(res, ['GET', 'POST'])
}

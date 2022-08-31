import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import { checkOwnerPermissionOnTask } from '@/lib/api/queries/checkOwnerPermissionOnAssessment'
import checkUserPermissionOnTask from '@/lib/api/queries/checkUserPermissionOnTask'
import { getFilteredSubmissions } from '@/lib/api/queries/getFilteredSubmissions'
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
import { getSubmissionsForAdmin } from '@/lib/api/queries/getSubmissionsForAdmin'

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

    if (session?.user.admin) {
      const submissions = await getSubmissionsForAdmin(
        filterArr,
        limit,
        taskId,
        userId,
        assessmentId
      )

      return ok(res, submissions)
    }

    if (filterArr.includes(Filter.enum.task) && taskId) {
      const task = await prisma.task.findUnique({
        where: { id: taskId },
        select: { private: true, id: true }
      })

      if (!task) return badRequest(res)

      if (!filterArr.includes(Filter.enum.own)) {
        if (task.private) {
          if (!session) return unauthorized(res)

          if (!(await checkUserPermissionOnTask(session, task.id))) {
            return forbidden(res)
          }

          const isAdminOrOwner =
            session.user.admin ||
            (await checkOwnerPermissionOnTask(session.user.id!, taskId))

          const infiniteSubmission = await getInfiniteSubmissions(
            limit,
            cursor,
            taskId,
            isAdminOrOwner ? undefined : session.user.id!
          )

          return ok(res, infiniteSubmission)
        }

        const infiniteSubmissions = await getInfiniteSubmissions(
          limit,
          cursor,
          taskId
        )

        return ok(res, infiniteSubmissions)
      } else {
        const submissions = await getFilteredSubmissions(
          filterArr,
          taskId,
          session ? session : undefined
        )

        return ok(res, submissions)
      }
    }

    return badRequest(res)
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

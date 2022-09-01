import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import checkOwnerPermissionOnAssessment from '@/lib/api/queries/checkOwnerPermissionOnAssessment'
import {
  CreateAssessmentSchema,
  IndividualAssessmentSchema
} from '@/lib/api/schema/assessment'
import prisma from '@/lib/prisma'
import dedupeAndMap from '@/utils/dedupeAndMap'
import {
  methodNotAllowed,
  unauthorized,
  ok,
  badRequest,
  forbidden
} from '@/utils/response'

import { authOptions } from '../../auth/[...nextauth]'
import { mdxToHtml } from '@/lib/renderMarkdown'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { query } = req
    const parsedQuery = IndividualAssessmentSchema.safeParse(query)

    if (!parsedQuery.success) {
      return badRequest(res)
    }

    const { id } = parsedQuery.data
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      return unauthorized(res)
    }

    if (session.user.admin) {
      const assessment = await prisma.assessment.findFirst({
        where: {
          id
        },
        include: {
          tasks: {
            select: {
              task: { select: { id: true, title: true, fullScore: true } }
            }
          },
          users: {
            select: {
              userId: true
            }
          },
          owners: {
            select: {
              userId: true
            }
          }
        }
      })

      return ok(res, {
        ...assessment,
        ...(assessment?.instruction && {
          instruction: await mdxToHtml(assessment?.instruction)
        }),
        tasks: assessment?.tasks.map(task => task.task)
      })
    }

    const assessment = await prisma.assessment.findFirst({
      where: {
        id,
        users: {
          some: {
            userId: session.user.id!
          }
        }
      },
      include: {
        tasks: {
          select: {
            task: { select: { id: true, title: true, fullScore: true } }
          }
        }
      }
    })

    return ok(res, {
      ...assessment,
      ...(assessment?.instruction && {
        instruction: await mdxToHtml(assessment?.instruction)
      }),
      tasks: assessment?.tasks.map(task => task.task)
    })
  } else if (req.method === 'DELETE') {
    const { query } = req
    const parsedQuery = IndividualAssessmentSchema.safeParse(query)

    if (!parsedQuery.success) {
      return badRequest(res)
    }

    const { id } = parsedQuery.data
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      return unauthorized(res)
    }

    if (await checkOwnerPermissionOnAssessment(session, id)) {
      const assessment = await prisma.assessment.delete({
        where: { id }
      })

      return ok(res, assessment)
    }

    return forbidden(res)
  } else if (req.method === 'PUT') {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      return unauthorized(res)
    }

    const { body, query } = req
    const parsedQuery = IndividualAssessmentSchema.safeParse(query)

    if (!parsedQuery.success) {
      return badRequest(res)
    }

    const parsedBody = CreateAssessmentSchema.safeParse(body)

    if (!parsedBody.success) {
      return badRequest(res)
    }

    const {
      id,
      name,
      archived,
      description,
      instruction,
      tasks,
      users,
      owners,
      open,
      close
    } = parsedBody.data

    if (await checkOwnerPermissionOnAssessment(session, id)) {
      const oldAssessment = await prisma.assessment.findUnique({
        where: { id },
        select: {
          tasks: { select: { taskId: true } },
          users: { select: { userId: true } },
          owners: { select: { userId: true } }
        }
      })

      if (!oldAssessment) {
        return badRequest(res)
      }

      const oldTasksId = oldAssessment.tasks.map(task => task.taskId)
      const oldUsersId = oldAssessment.users.map(user => user.userId)
      const oldOwnersId = oldAssessment.owners.map(owner => owner.userId)

      const addTasksId = tasks?.filter(taskId => !oldTasksId?.includes(taskId))
      const removeTaskId = oldTasksId.filter(taskId => !tasks?.includes(taskId))

      const addUsersId = users?.filter(userId => !oldUsersId?.includes(userId))
      const removeUsersId = oldUsersId.filter(
        userId => !users?.includes(userId)
      )

      const addOwnersId = owners?.filter(
        ownerId => !oldOwnersId?.includes(ownerId)
      )
      const removeOwnersId = oldOwnersId.filter(
        ownerId => !owners?.includes(ownerId)
      )

      const [_taskCount, _userCount, _ownerCount, assessment] =
        await prisma.$transaction([
          prisma.taskOnAssessment.deleteMany({
            where: { taskId: { in: removeTaskId }, assessmentId: id }
          }),
          prisma.userOnAssessment.deleteMany({
            where: { userId: { in: removeUsersId }, assessmentId: id }
          }),
          prisma.ownerOnAssessment.deleteMany({
            where: { userId: { in: removeOwnersId }, assessmentId: id }
          }),
          prisma.assessment.update({
            where: { id },
            data: {
              id,
              name,
              archived,
              description,
              instruction,
              ...(addTasksId && {
                tasks: {
                  connectOrCreate: [
                    ...dedupeAndMap(addTasksId, taskId => ({
                      where: {
                        taskId_assessmentId: { taskId, assessmentId: id }
                      },
                      create: { task: { connect: { id: taskId } } }
                    }))
                  ]
                }
              }),
              ...(addUsersId && {
                users: {
                  connectOrCreate: [
                    ...dedupeAndMap(addUsersId, userId => ({
                      where: {
                        userId_assessmentId: { userId, assessmentId: id }
                      },
                      create: { user: { connect: { id: userId } } }
                    }))
                  ]
                }
              }),
              ...(addOwnersId && {
                owners: {
                  connectOrCreate: [
                    ...dedupeAndMap(addOwnersId, userId => ({
                      where: {
                        userId_assessmentId: { userId, assessmentId: id }
                      },
                      create: { user: { connect: { id: userId } } }
                    }))
                  ]
                }
              }),
              open,
              close
            }
          })
        ])

      return ok(res, assessment)
    }
  }

  return methodNotAllowed(res, ['GET', 'DELETE', 'PUT'])
}

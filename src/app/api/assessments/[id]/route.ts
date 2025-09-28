import { notFound } from 'next/navigation'
import { NextRequest } from 'next/server'

import checkOwnerPermissionOnAssessment from '@/lib/api/queries/checkOwnerPermissionOnAssessment'
import {
  CreateAssessmentSchema,
  markdownTypeValues
} from '@/lib/api/schema/assessment'
import prisma from '@/lib/prisma'
import { mdxToHtml } from '@/lib/renderMarkdown'
import { getServerUser } from '@/lib/session'
import { badRequest, forbidden, json, unauthorized } from '@/utils/apiResponse'
import dedupeAndMap from '@/utils/dedupeAndMap'

export async function GET(
  req: NextRequest,
  ctx: RouteContext<'/api/assessments/[id]'>
) {
  const params = await ctx.params
  const { searchParams } = new URL(req.url)

  const id = params.id
  const mdType = searchParams.get('mdType')

  if (
    mdType !== null &&
    !markdownTypeValues.includes(mdType as (typeof markdownTypeValues)[number])
  ) {
    return badRequest(`mdType of ${mdType} is invalid`)
  }

  const user = await getServerUser()

  if (!user) return unauthorized()
  if (!user.id) return unauthorized('User ID not found')

  if (await checkOwnerPermissionOnAssessment(user, id)) {
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

    if (assessment === null) return notFound()

    return json({
      ...assessment,
      ...(assessment?.instruction && {
        instruction:
          mdType === 'RAW'
            ? assessment?.instruction
            : await mdxToHtml(assessment?.instruction)
      }),
      tasks: assessment?.tasks.map(task => task.task)
    })
  }

  const assessment = await prisma.assessment.findFirst({
    where: {
      id,
      users: {
        some: {
          userId: user.id
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

  if (assessment === null) return notFound()

  return json({
    ...assessment,
    ...(assessment?.instruction && {
      instruction:
        mdType === 'RAW'
          ? assessment?.instruction
          : await mdxToHtml(assessment?.instruction)
    }),
    tasks: assessment?.tasks.map(task => task.task)
  })
}

export async function DELETE(
  _: NextRequest,
  ctx: RouteContext<'/api/assessments/[id]'>
) {
  const params = await ctx.params
  const id = params.id
  const user = await getServerUser()

  if (!user) return unauthorized()

  if (await checkOwnerPermissionOnAssessment(user, id)) {
    const assessment = await prisma.assessment.delete({
      where: { id }
    })

    return json(assessment)
  } else {
    return forbidden()
  }
}

export async function PUT(req: NextRequest) {
  const user = await getServerUser()

  if (!user) return unauthorized()

  const parsedBody = CreateAssessmentSchema.safeParse(await req.json())

  if (!parsedBody.success) {
    return badRequest()
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

  if (await checkOwnerPermissionOnAssessment(user, id)) {
    const oldAssessment = await prisma.assessment.findUnique({
      where: { id },
      select: {
        tasks: { select: { taskId: true } },
        users: { select: { userId: true } },
        owners: { select: { userId: true } }
      }
    })

    if (!oldAssessment) {
      return badRequest()
    }

    const oldTasksId = oldAssessment.tasks.map(task => task.taskId)
    const oldUsersId = oldAssessment.users.map(user => user.userId)
    const oldOwnersId = oldAssessment.owners.map(owner => owner.userId)

    const addTasksId = tasks?.filter(taskId => !oldTasksId?.includes(taskId))
    const removeTaskId = oldTasksId.filter(taskId => !tasks?.includes(taskId))

    const addUsersId = users?.filter(userId => !oldUsersId?.includes(userId))
    const removeUsersId = oldUsersId.filter(userId => !users?.includes(userId))

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

    return json(assessment)
  }
}

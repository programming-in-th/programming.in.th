import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import {
  CreateAssessmentSchema,
  IndividualAssessmentSchema
} from '@/lib/api/schema/assessment'
import prisma from '@/lib/prisma'
import {
  methodNotAllowed,
  unauthorized,
  ok,
  badRequest,
  forbidden
} from '@/utils/response'

import { authOptions } from '../../auth/[...nextauth]'
import checkOwnerPermissionOnAssessment from '@/lib/api/queries/checkOwnerPermissionOnAssessment'
import removeArrDup from '@/utils/removeArrDup'

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
        tasks: { include: { task: true } }
      }
    })

    return ok(res, assessment)
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

    if (await checkOwnerPermissionOnAssessment(session.user.id!, id)) {
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
      private: isPrivate,
      description,
      instruction,
      tasks,
      users,
      owners,
      open,
      close
    } = parsedBody.data

    if (await checkOwnerPermissionOnAssessment(session.user.id!, id)) {
      const assessment = await prisma.assessment.update({
        where: { id },
        data: {
          id,
          name,
          private: isPrivate,
          description,
          instruction,
          ...(tasks && {
            tasks: {
              create: [
                ...removeArrDup(tasks).map(id => ({
                  task: { connect: { id } }
                }))
              ]
            }
          }),
          ...(users && {
            users: {
              create: [
                ...removeArrDup(users).map(id => ({
                  user: { connect: { id } }
                }))
              ]
            }
          }),
          ...(owners && {
            owners: {
              create: [
                ...removeArrDup([...owners, session.user.id!]).map(id => ({
                  user: { connect: { id } }
                }))
              ]
            }
          }),
          open,
          close
        }
      })

      return ok(res, assessment)
    }
  }

  return methodNotAllowed(res, ['GET'])
}

import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import prisma from '@/lib/prisma'
import {
  unauthorized,
  methodNotAllowed,
  ok,
  badRequest
} from '@/utils/response'

import { authOptions } from '../auth/[...nextauth]'
import { CreateAssessmentSchema } from '@/lib/api/schema/assessment'
import removeArrDup from '@/utils/removeArrDup'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      return unauthorized(res)
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id! },
      select: { admin: true }
    })

    if (user?.admin) {
      const assessment = await prisma.assessment.findMany()

      return ok(res, assessment)
    }

    const assessment = await prisma.assessment.findMany({
      where: {
        OR: [
          { users: { some: { userId: session.user.id! } } },
          { owners: { some: { userId: session.user.id! } } }
        ]
      }
    })

    return ok(res, assessment)
  } else if (req.method === 'POST') {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      return unauthorized(res)
    }

    const { body } = req

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

    const assessment = await prisma.assessment.create({
      data: {
        id,
        name,
        private: isPrivate,
        description,
        instruction,
        ...(tasks && {
          tasks: {
            create: [
              ...removeArrDup(tasks).map(id => ({ task: { connect: { id } } }))
            ]
          }
        }),
        ...(users && {
          users: {
            create: [
              ...removeArrDup(users).map(id => ({ user: { connect: { id } } }))
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

  return methodNotAllowed(res, ['GET', 'POST'])
}

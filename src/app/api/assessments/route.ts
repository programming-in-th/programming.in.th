import { NextRequest } from 'next/server'

import { CreateAssessmentSchema } from '@/lib/api/schema/assessment'
import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'
import { badRequest, json, unauthorized } from '@/utils/apiResponse'
import removeArrDup from '@/utils/removeArrDup'

export async function GET() {
  const user = await getServerUser()

  if (!user) return unauthorized()
  if (!user.id) return unauthorized('User ID not found')

  if (user.admin) {
    const assessments = await prisma.assessment.findMany()

    return json(assessments)
  }

  const assessments = await prisma.assessment.findMany({
    where: {
      OR: [
        { users: { some: { userId: user.id } } },
        { owners: { some: { userId: user.id } } }
      ]
    }
  })

  return json(assessments)
}

export async function POST(req: NextRequest) {
  const user = await getServerUser()

  if (!user) return unauthorized()
  if (!user.id) return unauthorized('User ID not found')

  const parsedBody = CreateAssessmentSchema.safeParse(await req.json())

  if (!parsedBody.success) return badRequest()

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

  const assessment = await prisma.assessment.create({
    data: {
      id,
      name,
      archived,
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
            ...removeArrDup([...owners, user.id]).map(id => ({
              user: { connect: { id } }
            }))
          ]
        }
      }),
      open,
      close
    }
  })

  return json(assessment)
}

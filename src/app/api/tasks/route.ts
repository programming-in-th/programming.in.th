import { NextRequest } from 'next/server'

import { ZodError } from 'zod'

import { TaskSchema } from '@/lib/api/schema/tasks'
import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'
import {
  badRequest,
  forbidden,
  internalServerError,
  json,
  unauthorized
} from '@/utils/apiResponse'

export async function GET() {
  const user = await getServerUser()

  const task = await prisma.task.findMany({
    ...(!user?.admin && { where: { private: false } })
  })

  return json(task)
}

export async function POST(req: NextRequest) {
  const user = await getServerUser()

  if (!user) return unauthorized()
  if (!user.admin) return forbidden()

  try {
    const task = TaskSchema.parse(await req.json())

    // const path = task.categoryId.split('/')
    // for (let i = 0; i < path.length; i++) {
    //   await prisma.category.upsert({
    //     where: { id: path.slice(0, i + 1).join('/') },
    //     update: {},
    //     create: {
    //       id: path.slice(0, i + 1).join('/'),
    //       name: path[i],
    //       parentCategoryId: path.slice(0, i).join('/') || null
    //     }
    //   })
    // }

    const createdTask = await prisma.task.create({
      data: {
        ...task,
        tags: {
          connectOrCreate: task.tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      }
    })

    return json(createdTask)
  } catch (err) {
    if (err instanceof ZodError) {
      return badRequest()
    } else {
      return internalServerError()
    }
  }
}

import stream from 'stream'
import { promisify } from 'util'

import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth'

import checkUserPermissionOnTask from '@/lib/api/queries/checkUserPermissionOnTask'
import prisma from '@/lib/prisma'
import {
  unauthorized,
  methodNotAllowed,
  forbidden,
  notFound
} from '@/utils/response'

import { authOptions } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { query } = req

    const task = await prisma.task.findUnique({
      where: { id: String(query.id) },
      select: {
        id: true,
        private: true
      }
    })

    if (task?.private) {
      const session = await unstable_getServerSession(req, res, authOptions)

      if (!session) {
        return unauthorized(res)
      }

      if (!(await checkUserPermissionOnTask(session, task.id))) {
        return forbidden(res)
      }
    }

    const pipeline = promisify(stream.pipeline)
    const url = `${process.env.NEXT_PUBLIC_AWS_URL}/statements/pdf/${query.id}.pdf`
    const response = await fetch(url)
    if (!response.ok) return notFound(res)

    const body = response.body

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader(
      'Content-Disposition',
      `inline; attachment; filename=${query.id}.pdf`
    )

    await pipeline(body as any, res)
  }

  return methodNotAllowed(res, ['GET'])
}

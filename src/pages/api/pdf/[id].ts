import stream from 'stream'
import { promisify } from 'util'

import type { NextApiRequest, NextApiResponse } from 'next'

import { GetObjectCommand } from '@aws-sdk/client-s3'
import { unstable_getServerSession } from 'next-auth'

import checkUserPermissionOnTask from '@/lib/api/queries/checkUserPermissionOnTask'
import prisma from '@/lib/prisma'
import { s3Client } from '@/lib/s3Client'
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
    try {
      const response = await s3Client.send(
        new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: `statements/pdf/${query.id}.pdf`
        })
      )

      const pipeline = promisify(stream.pipeline)
      const body = response.Body

      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader(
        'Content-Disposition',
        `inline; attachment; filename=${query.id}.pdf`
      )

      await pipeline(body as any, res)
      return
    } catch {
      return notFound(res)
    }
  }

  return methodNotAllowed(res, ['GET'])
}

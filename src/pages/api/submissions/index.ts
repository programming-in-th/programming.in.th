import type { NextApiRequest, NextApiResponse } from 'next'

import { Session, unstable_getServerSession } from 'next-auth'
import { createRouter } from 'next-connect'

import { compressCode } from '@/lib/codeTransformer'
import prisma from '@/lib/prisma'

import { authOptions } from '../auth/[...nextauth]'
import { getInfiniteSubmission } from '@/lib/api/queries/getInfiniteSubmissions'

enum Filter {
  OWN = 'own',
  TASK = 'task',
  OWN_TASK = 'own_task'
}

const router = createRouter<
  NextApiRequest & { session: Session },
  NextApiResponse
>()

router
  .use(async (req, res, next) => {
    const start = Date.now()
    await next()
    const end = Date.now()
    console.log(`Request took ${end - start}ms`)
  })
  .use(async (req, res, next) => {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (session) {
      req.session = session
    }

    await next()
  })
  .get(
    async (req, res, next) => {
      const { query, session } = req

      if (
        (query.filter === Filter.OWN_TASK || query.filter === Filter.OWN) &&
        !session
      ) {
        throw new Error('Unauthorized')
      }

      return next()
    },
    async (req, res) => {
      const { query, session } = req

      if (query.filter === Filter.TASK) {
        const infiniteSubmission = await getInfiniteSubmission(
          String(query.taskId),
          Number(query.cursor),
          Number(query.limit)
        )

        res.status(200).json(infiniteSubmission)
      } else {
        const submission = await getPersonalizedSubmission(
          String(query.filter),
          session,
          String(query.taskId)
        )

        res.status(200).json(submission)
      }
    }
  )
  .put(
    async (req, res, next) => {
      if (!req.session) throw new Error('Unauthorized')
      return next()
    },
    async (req, res) => {
      const { taskId, code, language } = req.body

      const session = req.session

      const compressedCode = await compressCode(JSON.stringify(code))

      try {
        const submission = await prisma.submission.create({
          data: {
            task: { connect: { id: taskId } },
            code: compressedCode,
            language: language,
            user: { connect: { id: session.user.id } },
            groups: []
          }
        })

        res.status(201).json(submission)
      } catch (_) {
        res.status(500)
      }
    }
  )

export default router.handler({
  onError: (err, req, res) => {
    if ((err as Error).message === 'Unauthorized') {
      res.status(401).end('Unauthorized')
    } else {
      res.status(500).end('Internal Server Error')
    }
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Route Not Found')
  }
})

const getPersonalizedSubmission = async (
  filter: string,
  session: Session,
  taskId: string
) => {
  if (session) {
    switch (filter) {
      case Filter.OWN:
        return await prisma.submission.findMany({
          orderBy: [
            {
              submittedAt: 'desc'
            }
          ],
          where: {
            user: {
              id: { equals: session.user.id }
            }
          },
          select: {
            id: true,
            score: true,
            user: true,
            language: true,
            time: true,
            memory: true,
            submittedAt: true
          }
        })
      case Filter.OWN_TASK:
        return await prisma.submission.findMany({
          orderBy: [
            {
              submittedAt: 'desc'
            }
          ],
          where: {
            taskId: String(taskId),
            user: {
              id: { equals: session.user.id }
            }
          },
          select: {
            id: true,
            score: true,
            user: true,
            language: true,
            time: true,
            memory: true,
            submittedAt: true
          }
        })
    }
  }

  return await prisma.submission.findMany({
    orderBy: [
      {
        submittedAt: 'desc'
      }
    ]
  })
}

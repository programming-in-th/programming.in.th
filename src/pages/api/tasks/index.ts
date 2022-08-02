import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth/next'
import { createRouter } from 'next-connect'

import prisma from '@/lib/prisma'
import { Session } from '@/types/session'

import { authOptions } from '../auth/[...nextauth]'

enum Filter {
  ALL = 'all',
  TRIED = 'tried',
  SOLVED = 'solved'
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
    const session = (await unstable_getServerSession(
      req,
      res,
      authOptions
    )) as Session

    if (session) {
      req.session = session
    }

    await next()
  })
  .get(
    async (req, res, next) => {
      const { query } = req

      if (
        (query.filter === Filter.SOLVED || query.filter === Filter.TRIED) &&
        !req.session
      ) {
        throw new Error('Unauthorized')
      }
    },
    async (req, res) => {
      const { query } = req

      const task = await getTask(String(query.filter), req.session)
      res.status(200).json(task)
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

const getTask = async (filter: string = Filter.ALL, session: Session) => {
  if (session) {
    switch (filter) {
      case Filter.SOLVED:
        return await prisma.task.findMany({
          where: {
            Submissions: {
              some: {
                score: {
                  equals: 100
                },
                user: {
                  id: { equals: session.user.id }
                }
              }
            }
          }
        })

      case Filter.TRIED:
        return await prisma.task.findMany({
          where: {
            Submissions: {
              none: {
                score: {
                  equals: 100
                }
              },
              some: {
                user: {
                  id: { equals: session.user.id }
                }
              }
            }
          }
        })
    }
  }

  return await prisma.task.findMany()
}

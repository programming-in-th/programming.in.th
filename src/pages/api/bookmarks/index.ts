import type { NextApiRequest, NextApiResponse } from 'next'

import { Session, unstable_getServerSession } from 'next-auth'
import { createRouter } from 'next-connect'

import prisma from '@/lib/prisma'

import { authOptions } from '../auth/[...nextauth]'

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
  .use(async (req, res, next) => {
    if (!req.session) throw new Error('Unauthorized')
    return next()
  })
  .get(async (req, res) => {
    const rawBookmark = await prisma.bookmark.findMany({
      where: {
        user: {
          id: { equals: req.session.user.id }
        }
      }
    })

    const bookmarks = rawBookmark.map(bookmark => {
      return bookmark.taskId
    })

    res.status(200).json(bookmarks)
  })
  .post(async (req, res) => {
    const bookmark = await prisma.bookmark.create({
      data: {
        Task: { connect: { id: String(req.body.id) } },
        user: { connect: { id: req.session.user.id } }
      }
    })

    res.status(200).json(bookmark)
  })
  .delete(async (req, res) => {
    const bookmark = await prisma.bookmark.delete({
      where: {
        taskId_userId: {
          taskId: String(req.body.id),
          userId: req.session.user.id
        }
      }
    })

    res.status(200).json(bookmark)
  })

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

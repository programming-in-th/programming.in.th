import { Prisma } from '@prisma/client'
import { User } from 'next-auth'

import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'
import { ISolved } from '@/types/tasks'

import { TaskSearch } from './TaskSearch'

async function getTasks(user: User) {
  const rawTasks = await prisma.task.findMany({
    where: {
      private: false
    }
  })

  return rawTasks.map(item => {
    return {
      id: item.id,
      title: item.title,
      tags: [] as string[],
      solved: 0,
      score: 0,
      fullScore: item.fullScore,
      tried: false,
      bookmarked: false
    }
  })
}

async function getSolved() {
  const rawSolved = await prisma.$queryRaw(
    Prisma.sql`SELECT COUNT(DISTINCT submission.user_id), submission.task_id FROM submission INNER JOIN task ON submission.task_id = task.id WHERE submission.score = task.full_score GROUP BY submission.task_id`
  )

  return JSON.parse(
    JSON.stringify(rawSolved, (_, v) =>
      typeof v === 'bigint' ? `${v}n` : v
    ).replace(/"(-?\d+)n"/g, (_, a) => a)
  ) as ISolved[]
}

async function getScore(user: User) {
  return (await prisma.$queryRaw(
    Prisma.sql`SELECT task_id, max(score) FROM submission WHERE user_id = ${user?.id} GROUP BY task_id;`
  )) as Array<{ task_id: string; max: number }>
}

async function getBookmark(user: User) {
  const rawBookmark = await prisma.bookmark.findMany({
    where: {
      user: {
        id: { equals: user?.id }
      }
    }
  })

  return user
    ? rawBookmark.map(bookmark => {
        return bookmark.taskId
      })
    : []
}

export default async function Tasks() {
  const [user, solved] = await Promise.all([getServerUser(), getSolved()])
  const [tasks, score, bookmarks] = await Promise.all([
    getTasks(user as User),
    getScore(user as User),
    getBookmark(user as User)
  ])

  return (
    <div className="flex w-auto justify-center">
      <div className="flex min-h-[calc(100vh-2.5rem)] w-full max-w-7xl flex-col items-center">
        <TaskSearch
          header={
            <>
              <p className="text-3xl font-medium text-gray-500 dark:text-gray-100">
                Tasks
              </p>
              <p className="text-md text-gray-500 dark:text-gray-300">
                Browse over 700+ tasks
              </p>
            </>
          }
          tasks={tasks}
          solved={solved}
          score={score}
          bookmarks={bookmarks}
        />
      </div>
    </div>
  )
}

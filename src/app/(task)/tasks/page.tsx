import { Prisma } from '@prisma/client'
import { User } from 'next-auth'

import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'
import { ISolved } from '@/types/tasks'

import { TaskSearch } from './TaskSearch'

async function getTasks(user: User) {
  const rawTasks = await prisma.task.findMany({
    where: {
      OR: [
        {
          taskOnAssessment: {
            some: {
              assessment: {
                is: {
                  users: { some: { userId: user?.id } },
                  archived: false
                }
              }
            }
          }
        },
        { private: false }
      ]
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

export default async function Tasks() {
  const user = (await getServerUser()) as User
  const tasks = await getTasks(user)

  const rawSolved = await prisma.$queryRaw(
    Prisma.sql`SELECT COUNT(DISTINCT user_id), task_id FROM submission WHERE score = 100 GROUP BY task_id`
  )

  const solved = JSON.parse(
    JSON.stringify(rawSolved, (_, v) =>
      typeof v === 'bigint' ? `${v}n` : v
    ).replace(/"(-?\d+)n"/g, (_, a) => a)
  ) as ISolved[]

  const score = (await prisma.$queryRaw(
    Prisma.sql`SELECT task_id, max(score) FROM submission WHERE user_id = ${user?.id} GROUP BY task_id;`
  )) as Array<{ task_id: string; max: number }>

  const rawBookmark = await prisma.bookmark.findMany({
    where: {
      user: {
        id: { equals: user?.id }
      }
    }
  })

  const bookmarks = user
    ? rawBookmark.map(bookmark => {
        return bookmark.taskId
      })
    : []

  return (
    <div className="flex w-auto justify-center">
      <div className="flex min-h-screen w-full max-w-7xl flex-col items-center">
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

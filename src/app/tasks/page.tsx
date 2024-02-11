import { Metadata } from 'next'

import { Prisma } from '@prisma/client'

import prisma from '@/lib/prisma'
import { ISolved } from '@/types/tasks'

import { TaskSearch } from './TaskSearch'

export const revalidate = 3600 // 1 hour

export const metadata: Metadata = {
  title: 'Tasks - programming.in.th'
}

async function getTasks() {
  const rawTasks = await prisma.task.findMany({
    where: {
      private: false
    },
    include: {
      tags: true
    }
  })

  return rawTasks.map(item => {
    return {
      id: item.id,
      title: item.title,
      tags: item.tags.map(tag => tag.name),
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

export default async function Tasks() {
  const [tasks, solved] = await Promise.all([getTasks(), getSolved()])

  const tags: string[] = Array.from(new Set(tasks.flatMap(task => task.tags)))

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
          tags={tags}
        />
      </div>
    </div>
  )
}

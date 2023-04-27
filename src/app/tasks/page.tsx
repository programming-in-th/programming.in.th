import { Prisma } from '@prisma/client'
import { User } from 'next-auth'

import { TasksList } from '@/components/Tasks/List'
import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/session'
import { ISolved } from '@/types/tasks'

const getTasks = async (user: User) => {
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
      tags: [],
      solved: 0,
      score: 0,
      fullScore: item.fullScore,
      tried: false,
      bookmarked: false
    }
  })
}

const Tasks = async () => {
  const user = (await getCurrentUser()) as User
  const tasks = await getTasks(user)

  //   const [filteredTasks, setFilteredTasks] = useState<IGeneralTask[]>(tasks)
  //   const { push, query } = useRouter()

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
  )) as Array<{ taskId: string; max: number }>

  const rawBookmark = await prisma.bookmark.findMany({
    where: {
      user: {
        id: { equals: user?.id }
      }
    }
  })

  const bookmarks = rawBookmark.map(bookmark => {
    return bookmark.taskId
  })

  const processedTask = tasks.map(task => ({
    ...task,
    solved: solved
      ? solved.find(item => item.taskId === task.id)?.count || 0
      : 0,
    score: score ? score.find(item => item.taskId === task.id)?.max || 0 : 0,
    bookmarked: bookmarks ? bookmarks.includes(task.id) : false,
    tried: score
      ? score.find(item => item.taskId === task.id) !== undefined
      : false
  }))

  return (
    <div className="flex w-auto justify-center">
      <div className="flex min-h-screen w-full max-w-7xl flex-col items-center">
        <div className="flex w-full flex-col items-center pt-6 pb-6">
          <p className="text-3xl font-medium text-gray-500 dark:text-gray-100">
            Tasks
          </p>
          <p className="text-md text-gray-500 dark:text-gray-300">
            browse over 700+ tasks
          </p>
          {/* <input
            className="my-4 w-60 rounded-md border-gray-300 bg-gray-100 px-2 py-1 text-sm shadow-sm dark:border-slate-900 dark:bg-slate-700 dark:text-gray-100"
            placeholder="Search..."
            onChange={async e => {
              push({
                pathname: '/tasks',
                query: { ...query, page: 1 }
              })
              const { value } = e.currentTarget
              if (value) {
                const Fuse = (await import('fuse.js')).default
                const fuse = new Fuse(tasks, {
                  keys: ['id', 'title'],
                  threshold: 0.25
                })

                setFilteredTasks(fuse.search(value).map(val => val.item))
              } else {
                setFilteredTasks(tasks)
              }
            }}
          /> */}
        </div>
        <div className="flex w-full flex-col md:flex-row">
          {/* <SideBar /> */}
          <TasksList tasks={processedTask} />
        </div>
      </div>
    </div>
  )
}

export default Tasks

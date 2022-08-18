import { useMemo, useState } from 'react'

import { InferGetStaticPropsType } from 'next'

import { useSession } from 'next-auth/react'
import useSWR from 'swr'

import { PageLayout } from '@/components/Layout'
import { TasksList } from '@/components/Tasks/List'
import { SideBar } from '@/components/Tasks/SideBar'
import fetcher from '@/lib/fetcher'
import prisma from '@/lib/prisma'
import { Score, Solved } from '@/types/tasks'

const Tasks = ({ tasks }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { status } = useSession()

  const { data: solved, error: solvedErr } = useSWR<Solved[]>(
    '/api/submissions/solved',
    fetcher
  )

  const { data: score, error: scoreErr } = useSWR<Score[]>(
    status === 'authenticated' ? '/api/submissions/score' : null,
    fetcher
  )

  const { data: bookmarks, error: bookmarkErr } = useSWR<string[]>(
    status === 'authenticated' ? '/api/bookmarks' : null,
    fetcher
  )

  const processedTask = useMemo(() => {
    return tasks.map(task => ({
      ...task,
      solved:
        solved && !solvedErr
          ? solved.find(item => item.taskId === task.id)?.count || 0
          : 0,
      score:
        score && !scoreErr
          ? score.find(item => item.taskId === task.id)?.max || 0
          : 0,
      bookmarked:
        bookmarks && !bookmarkErr ? bookmarks.includes(task.id) : false,
      tried:
        score && !scoreErr
          ? score.find(item => item.taskId === task.id) !== undefined
          : false
    }))
  }, [tasks, solved, score, bookmarks, bookmarkErr, scoreErr, solvedErr])

  const [tag, setTag] = useState<boolean>(false)

  return (
    <PageLayout>
      <div className="flex w-auto justify-center">
        <div className="flex min-h-screen w-full max-w-7xl flex-col items-center">
          <div className="flex w-full flex-col items-center pt-6 pb-10">
            <p className="text-3xl font-medium text-gray-500 dark:text-gray-100">
              Tasks
            </p>
            <p className="text-md text-gray-500 dark:text-gray-300">
              browse over 700+ tasks
            </p>
            {/* <input
              className="px-2 py-1 my-4 text-sm bg-gray-100 border-gray-300 rounded-md shadow-sm w-60"
              placeholder="search..."
            /> */}
          </div>
          <div className="flex w-full flex-col md:flex-row">
            <SideBar />
            <TasksList tasks={processedTask} tag={tag} setTag={setTag} />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default Tasks

export async function getStaticProps() {
  const tasks = await prisma.task.findMany()

  return {
    props: {
      tasks: tasks.map(item => {
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
  }
}

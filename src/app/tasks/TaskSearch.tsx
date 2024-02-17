'use client'

import { FC, ReactNode, Suspense, useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import useSWR from 'swr'

import { TasksList } from '@/components/Tasks/List'
import fetcher from '@/lib/fetcher'
import { IGeneralTask, IScore, ISolved } from '@/types/tasks'

import { TasksSidebar } from './TasksSidebar'

type TaskSearchProps = {
  header: ReactNode
  tasks: IGeneralTask[]
  solved: ISolved[]
  tags: string[]
}

export const TaskSearch: FC<TaskSearchProps> = ({
  header,
  tasks,
  solved,
  tags
}) => {
  const router = useRouter()

  const [filteredTasks, setFilteredTasks] = useState<IGeneralTask[]>(tasks)
  const [tagFilter, setTagFilter] = useState<string[]>([])

  const { data: bookmarks } = useSWR<string[]>('api/bookmarks', fetcher)
  const { data: score } = useSWR<IScore[]>('api/score', fetcher)

  const processedTasks = useMemo(
    () =>
      filteredTasks
        .map(task => ({
          ...task,
          solved: solved
            ? solved.find(item => item.task_id === task.id)?.count || 0
            : 0,
          score: score
            ? score.find(item => item.task_id === task.id)?.max || 0
            : null,
          bookmarked: bookmarks ? bookmarks.includes(task.id) : false,
          tried: score
            ? score.find(item => item.task_id === task.id) !== undefined
            : false
        }))
        .filter(task =>
          tagFilter.length > 0
            ? task.tags.some(tag => tagFilter.includes(tag))
            : true
        )
        .sort((a, b) => {
          if (a.id < b.id) {
            return -1
          } else if (a.id > b.id) {
            return 1
          } else {
            return 0
          }
        }),
    [bookmarks, score, filteredTasks, solved, tagFilter]
  )

  return (
    <>
      <div className="flex w-full flex-col items-center pb-6 pt-6">
        {header}
        <input
          className="my-4 w-60 rounded-md border-gray-300 bg-gray-100 px-2 py-1 text-sm shadow-sm dark:border-slate-900 dark:bg-slate-700 dark:text-gray-100"
          placeholder="Search..."
          onChange={async e => {
            router.replace('/tasks')

            const { value } = e.currentTarget
            if (value) {
              const Fuse = (await import('fuse.js')).default
              const fuse = new Fuse(tasks, {
                keys: ['id', 'title'],
                threshold: 0.125
              })

              setFilteredTasks(fuse.search(value).map(val => val.item))
            } else {
              setFilteredTasks(tasks)
            }
          }}
        />
      </div>
      <div className="flex w-full flex-col md:flex-row">
        <Suspense>
          <TasksSidebar
            tags={tags}
            tagFilter={tagFilter}
            setTagFilter={setTagFilter}
          />
          <TasksList tagFilter={tagFilter} tasks={processedTasks} />
        </Suspense>
      </div>
    </>
  )
}

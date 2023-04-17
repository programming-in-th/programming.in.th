'use client'
import { useMemo, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { IGeneralTask } from '@/types/tasks'

import { Listing } from './All'
import { Pagination } from './Pagination'

interface ITab {
  condition: (_task: IGeneralTask) => boolean
  value: string | null
}

const Tabs: ITab[] = [
  {
    condition: () => true,
    value: null
  },
  {
    condition: (task: IGeneralTask) =>
      task.tried && task.score !== task.fullScore,
    value: 'tried'
  },
  {
    condition: (task: IGeneralTask) => task.score === task.fullScore,
    value: 'solved'
  },
  {
    condition: () => true,
    value: 'archives'
  },
  {
    condition: (task: IGeneralTask) => task.bookmarked,
    value: 'bookmarked'
  }
]

const LIMIT = 7

export const TasksList = ({ tasks }: { tasks: IGeneralTask[] }) => {
  const searchParams = useSearchParams()
  const type = searchParams?.get('type')
  const qPage = searchParams?.get('page')

  const [tag, setTag] = useState<boolean>(false)

  const condition = useMemo<(_task: IGeneralTask) => boolean>(
    () =>
      Tabs.find(
        tab =>
          (type === undefined && tab.value === null) ||
          tab.value === String(type)
      )!.condition,
    [type]
  )

  const filteredTask = useMemo(
    () => tasks.filter(condition),
    [tasks, condition]
  )

  const page = useMemo(() => parseInt(qPage as string) || 1, [qPage])

  const pageLimit = useMemo(
    () => Math.ceil(filteredTask.length / LIMIT),
    [filteredTask]
  )

  const slicedTask = useMemo(
    () => filteredTask.slice((page - 1) * LIMIT, page * LIMIT),
    [filteredTask, page]
  )

  return (
    <div className="flex w-full flex-col">
      <Listing tasks={slicedTask} tag={tag} setTag={setTag} />
      <Pagination page={page} pageLimit={pageLimit} />
    </div>
  )
}

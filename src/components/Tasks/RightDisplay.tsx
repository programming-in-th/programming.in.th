import { Dispatch, SetStateAction, useMemo } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { IGeneralTask } from '@/types/tasks'

import { AllTasks } from './All'
import { Pagination } from './Pagination'

const ComingSoonTab = () => {
  return (
    <div className="w-full">
      <p className="text-center text-sm font-medium text-prog-gray-500">
        Coming Soon...
      </p>
    </div>
  )
}

const Tabs = [
  {
    condition: () => true,
    value: 'undefined'
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

const LIMIT = 5

export const RightDisplay = ({
  tasks,
  tag,
  setTag
}: {
  tasks: IGeneralTask[]
  tag: boolean
  setTag: Dispatch<SetStateAction<boolean>>
}) => {
  const { query } = useRouter()

  const condition = useMemo(
    () => Tabs.find(tab => tab.value === String(query?.type)).condition,
    [query]
  )

  const filteredTask = useMemo(
    () => tasks.filter(condition),
    [tasks, condition]
  )

  const page = useMemo(() => parseInt(query?.page as string) || 1, [query])

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
      <AllTasks tasks={slicedTask} tag={tag} setTag={setTag} />
      <Pagination page={page} pageLimit={pageLimit} />
    </div>
  )
}

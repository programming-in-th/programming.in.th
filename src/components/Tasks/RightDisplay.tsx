import { Dispatch, SetStateAction, useMemo } from 'react'

import { useRouter } from 'next/router'

import { IGeneralTask } from '@/types/tasks'

import { AllTasks } from './All'
import Link from 'next/link'

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

const Pagination = ({
  page,
  pageLimit
}: {
  page: number
  pageLimit: number
}) => {
  const { query } = useRouter()
  return (
    <div className="justfiy-between mt-4 flex w-full pr-4 pl-4 md:pr-20">
      {page > 1 && (
        <Link
          href={{ pathname: '/tasks', query: { ...query, page: page - 1 } }}
          passHref
          scroll={false}
        >
          <a className="flex items-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <p className="ml-2 text-sm">Previous</p>
          </a>
        </Link>
      )}
      <div className="flex w-full"></div>
      {page < pageLimit && (
        <Link
          href={{ pathname: '/tasks', query: { ...query, page: page + 1 } }}
          passHref
          scroll={false}
        >
          <a className="flex items-center text-gray-400">
            <p className="mr-2 text-sm">Next</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </Link>
      )}
    </div>
  )
}

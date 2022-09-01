import { useMemo } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { StarIcon as StarIconOutline } from '@heroicons/react/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/solid'
import { Task } from '@prisma/client'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import useSWR, { mutate } from 'swr'

import fetcher from '@/lib/fetcher'
import { IGeneralSubmission } from '@/types/submissions'

import { PieChart } from '../common/PieChart'

const NormalTabs = [
  {
    label: 'Statement',
    value: 'statement',
    url: ''
  },
  {
    label: 'Submit',
    value: 'submit',
    url: 'submit'
  },
  {
    label: 'Submissions',
    value: 'submissions',
    url: 'submissions'
  },
  {
    label: 'Solution',
    value: 'solution',
    url: 'solution'
  }
]

const AssessmentTabs = [
  {
    label: 'Statement',
    value: 'statement',
    url: ''
  },
  {
    label: 'Submit',
    value: 'submit',
    url: 'submit'
  },
  {
    label: 'My Submissions',
    value: 'submissions',
    url: 'submissions'
  }
]

export const SideBar = ({
  task,
  type,
  assessmentId
}: {
  task: Task
  type: string
  assessmentId?: string
}) => {
  const { status } = useSession()

  const { data } = useSWR<{
    data: IGeneralSubmission[]
    nextCursor: number | null
  }>(
    task && status === 'authenticated'
      ? `/api/submissions?filter=own&filter=task&taskId=${task.id}${
          assessmentId && `&filter=assessment&assessmentId=${assessmentId}`
        }`
      : null,
    fetcher
  )

  const { data: bookmark } = useSWR<boolean>(
    task && status === 'authenticated'
      ? `/api/bookmarks/task/${task.id}`
      : null,
    fetcher
  )

  const Tabs = useMemo(
    () => (assessmentId ? AssessmentTabs : NormalTabs),
    [assessmentId]
  )

  const { push } = useRouter()

  console.log(data)

  const maxScore = useMemo(() => {
    return data ? Math.max(...data.data.map(sub => sub.score), 0) : 0
  }, [data])

  // if (task === undefined) return <div>loading</div>

  return (
    <section className="w-full flex-none md:w-[14rem]">
      <div className="flex flex-row-reverse justify-between space-x-2 px-2 md:flex-row md:justify-start md:px-0">
        {!assessmentId && (
          <button
            className="mt-1 flex"
            onClick={async () => {
              mutate(
                `/api/bookmarks/task/${task.id}`,
                async (state: boolean) => {
                  await fetch(`/api/bookmarks`, {
                    method: state ? 'POST' : 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ taskId: task.id })
                  })
                  return state
                },
                { optimisticData: !bookmark }
              )
            }}
          >
            {bookmark ? (
              <StarIconSolid className="h-5 w-5 text-gray-400 dark:text-amber-400" />
            ) : (
              <StarIconOutline className="h-5 w-5 text-gray-300" />
            )}
          </button>
        )}
        <div
          className={clsx(
            'flex w-full flex-col',
            task === undefined && 'animate-pulse'
          )}
        >
          <h1
            className={clsx(
              'h-6 w-full text-lg font-medium dark:text-white',
              task === undefined && 'rounded bg-gray-200 dark:bg-slate-700'
            )}
          >
            {task?.title}
          </h1>
          <p
            className={clsx(
              'mt-1 h-5 w-full font-light dark:text-white',
              task === undefined && 'rounded bg-gray-200 dark:bg-slate-700'
            )}
          >
            {task?.id}
          </p>
        </div>
      </div>
      <select
        className="mt-2 w-full px-4 py-2 md:hidden"
        onChange={({ target: { value } }) =>
          push({
            pathname: assessmentId
              ? `/assessments/${assessmentId}/${task?.id}/${value}`
              : `/tasks/${task?.id}/${value}`
          })
        }
      >
        {type &&
          Tabs.map(tabItem => (
            <option
              key={tabItem.value}
              value={tabItem.url}
              selected={type === tabItem.value}
            >
              {tabItem.label}
            </option>
          ))}
      </select>

      <hr className="my-4 hidden md:block" />

      <div className="hidden shrink flex-col font-display md:flex">
        {Tabs.map(tabItem => {
          return (
            <Link
              href={
                assessmentId
                  ? `/assessments/${assessmentId}/${task?.id}/${tabItem.url}`
                  : `/tasks/${task?.id}/${tabItem.url}`
              }
              key={tabItem.label}
            >
              <a>
                <button
                  key={tabItem.label}
                  className={clsx(
                    'flex h-9 w-full items-center justify-center rounded-md transition-colors',
                    type === tabItem.value
                      ? 'bg-gray-100 dark:bg-slate-700'
                      : 'hover:bg-gray-50 dark:hover:bg-slate-600'
                  )}
                >
                  <p className="text-sm text-gray-500 dark:text-gray-100">
                    {tabItem.label}
                  </p>
                </button>
              </a>
            </Link>
          )
        })}
      </div>

      <hr className="my-4 hidden md:block" />

      <div className="hidden flex-col items-center justify-center text-slate-500 dark:text-gray-300 md:flex">
        <p className="mb-4 font-light dark:text-gray-200">Your Score</p>
        {/* @TODO Login or show login button */}
        <PieChart points={maxScore} />
      </div>

      <hr className="my-4 hidden md:block" />

      <div className="hidden flex-col items-center justify-center md:flex">
        <a
          target="_blank"
          href="https://google.com"
          rel="noreferrer"
          className="mb-4 w-full text-center font-light dark:text-white"
        >
          Report
        </a>
      </div>
    </section>
  )
}

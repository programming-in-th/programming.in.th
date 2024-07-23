'use client'

import { useMemo } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Task } from '@prisma/client'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

import { PieChart } from '@/components/common/PieChart'
import fetcher from '@/lib/fetcher'
import zipFetcher from '@/lib/zipFetcher'
import { IListSubmission } from '@/types/submissions'

import { Attachment } from './Attachment'

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
    label: 'My Submissions',
    value: 'my-submissions',
    url: 'my-submissions'
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

  const { data } = useSWR<CursorPagination<IListSubmission[], number>>(
    task && status === 'authenticated'
      ? `/api/submissions?filter=own&filter=task&taskId=${task.id}${
          assessmentId ? `&filter=assessment&assessmentId=${assessmentId}` : ''
        }`
      : null,
    fetcher
  )

  // TODO: Find a better way to fetch attachment
  const { data: attachment } = useSWR<Blob | JSON>(
    `/api/tasks/${task.id}/attachment`,
    zipFetcher
  )

  const Tabs = useMemo(
    () => (assessmentId ? AssessmentTabs : NormalTabs),
    [assessmentId]
  )

  const router = useRouter()

  const maxScore = useMemo(() => {
    return data ? Math.max(...data.data.map(sub => sub.score), 0) : 0
  }, [data])

  return (
    <section className="w-full flex-none">
      <select
        className="mt-2 w-full px-4 py-2 md:hidden"
        onChange={({ target: { value } }) =>
          router.push(
            assessmentId
              ? `/assessments/${assessmentId}/${task?.id}/${value}`
              : `/tasks/${task?.id}/${value}`
          )
        }
        value={Tabs.find(tab => type === tab.value)?.url}
      >
        {type &&
          Tabs.map(tabItem => (
            <option key={tabItem.value} value={tabItem.url}>
              {tabItem.label}
            </option>
          ))}
      </select>

      <hr className="mb-4 hidden md:block" />

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
            </Link>
          )
        })}
      </div>

      <hr className="my-4 hidden md:block" />

      <div className="hidden flex-col items-center justify-center text-slate-500 dark:text-gray-300 md:flex">
        <p className="mb-4 font-light dark:text-gray-200">Your Score</p>
        {/* @TODO Login or show login button */}
        <PieChart points={maxScore} fullScore={task.fullScore} />
      </div>

      <hr className="my-4 hidden md:block" />

      <Attachment attachmentData={attachment} id={task.id} />

      <div className="hidden flex-col items-center justify-center md:flex">
        <a
          target="_blank"
          href="https://forms.gle/HRuSQ14gEcHbcfVR8"
          rel="noreferrer"
          className="mb-4 w-full text-center font-light dark:text-white"
        >
          Report
        </a>
      </div>
    </section>
  )
}

import { useEffect, useMemo, useState } from 'react'

import Link from 'next/link'

import { StarIcon as StarIconOutline } from '@heroicons/react/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/solid'
import { Task } from '@prisma/client'
import clsx from 'clsx'
import useSWR, { mutate } from 'swr'

import fetcher from '@/lib/fetcher'
import { IGeneralSubmission } from '@/types/submissions'

import { PieChart } from '../common/PieChart'

const Tabs = [
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
    value: 'mySubmissions',
    url: 'mySubmissions'
  },
  {
    label: 'Solution',
    value: 'solution',
    url: 'solution'
  }
]

export const LeftBar = ({ task, type }: { task: Task; type: string }) => {
  const { data, error } = useSWR<IGeneralSubmission[]>(
    task ? `/api/submissions?filter=own_task&taskId=${task.id}` : null,
    fetcher
  )

  const { data: bookmark, error: errorBookmark } = useSWR<boolean>(
    task ? `/api/bookmarks/task/${task.id}` : null,
    fetcher
  )

  const maxScore = useMemo(() => {
    return data ? Math.max(...data.map(sub => sub.score), 0) : 0
  }, [data])
  if (task === undefined) return <div>loading</div>

  return (
    <section className="w-[14rem] flex-none">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <button
            onClick={async () => {
              mutate(
                `/api/bookmarks/task/${task.id}`,
                async (state: boolean) => {
                  await fetch(`/api/bookmarks`, {
                    method: state ? 'POST' : 'DELETE',
                    body: task.id
                  })
                  return state
                },
                { optimisticData: !bookmark }
              )
            }}
          >
            {bookmark ? (
              <StarIconSolid className="h-5 w-5 text-gray-400" />
            ) : (
              <StarIconOutline className="h-5 w-5 text-gray-300" />
            )}
          </button>
          <h1 className="text-lg font-medium">{task.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5" />
          <p className="font-light">{task.id}</p>
        </div>
      </div>

      <hr className="my-8" />

      <div className="flex shrink flex-col font-display">
        {Tabs.map(tabItem => {
          return (
            <Link href={`/tasks/${task.id}/${tabItem.url}`} key={tabItem.label}>
              <a>
                <button
                  key={tabItem.label}
                  className={clsx(
                    'flex h-9 w-full items-center justify-center rounded-md transition-colors',
                    type === tabItem.value ? 'bg-gray-100' : 'hover:bg-gray-50'
                  )}
                >
                  <p className="text-sm text-gray-500">{tabItem.label}</p>
                </button>
              </a>
            </Link>
          )
        })}
      </div>

      <hr className="my-8" />

      <div className="flex flex-col items-center justify-center">
        <p className="mb-4 font-light">Your Score</p>
        {/* @TODO Login or show login button */}
        <PieChart points={maxScore} />
      </div>

      <hr className="my-8" />

      <div className="flex flex-col items-center justify-center">
        <a
          target="_blank"
          href="https://google.com"
          rel="noreferrer"
          className="mb-4 w-full text-center font-light"
        >
          Report
        </a>
      </div>

      {/* <h2 className="mb-3">Attatchments</h2> */}

      {/* <table className="w-full border border-collapse border-gray-300 rounded-md table-auto">
        <tbody>
          <tr>
            <td className="w-full px-5 py-4 transition-colors border border-gray-200 hover:bg-slate-50">
              <button className="flex items-center justify-between w-full">
                <p className="">attachmentsfilename...</p>
                <DownloadIcon className="w-5 h-5 text-prog-primary-500" />
              </button>
            </td>
          </tr>
          <tr>
            <td className="w-full px-5 py-4 transition-colors border border-gray-200 hover:bg-slate-50">
              <button className="flex items-center justify-between w-full">
                <p className="">attachmentsfilename...</p>
                <DownloadIcon className="w-5 h-5 text-prog-primary-500" />
              </button>
            </td>
          </tr>
        </tbody>
      </table> */}
    </section>
  )
}

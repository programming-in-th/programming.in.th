import { useMemo } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

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
    label: 'Solution',
    value: 'solution',
    url: 'solution'
  }
]

export const LeftBar = ({ task, type }: { task: Task; type: string }) => {
  const { data } = useSWR<IGeneralSubmission[]>(
    task ? `/api/submissions?filter=own&filter=task&taskId=${task.id}` : null,
    fetcher
  )

  const { data: bookmark } = useSWR<boolean>(
    task ? `/api/bookmarks/task/${task.id}` : null,
    fetcher
  )

  const { push } = useRouter()

  const maxScore = useMemo(() => {
    return data ? Math.max(...data.map(sub => sub.score), 0) : 0
  }, [data])

  if (task === undefined) return <div>loading</div>

  return (
    <section className="w-full flex-none md:w-[14rem]">
      <div className="flex flex-row-reverse justify-between space-x-2 px-2 md:flex-row md:justify-start md:px-0">
        <button
          className="mt-1 flex"
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
            <StarIconSolid className="h-5 w-5 text-gray-400 dark:text-amber-400" />
          ) : (
            <StarIconOutline className="h-5 w-5 text-gray-300" />
          )}
        </button>
        <div className="flex flex-col">
          <h1 className="text-lg font-medium dark:text-white">{task.title}</h1>
          <p className="font-light dark:text-white">{task.id}</p>
        </div>
      </div>
      <select
        className="mt-2 w-full px-4 py-2 md:hidden"
        onChange={({ target: { value } }) =>
          push({ pathname: `/tasks/${task.id}/${value}` })
        }
      >
        {Tabs.map(tabItem => (
          <option key={tabItem.value} value={tabItem.url}>
            {tabItem.label}
          </option>
        ))}
      </select>

      <hr className="my-8 hidden md:block" />

      <div className="hidden shrink flex-col font-display md:flex">
        {Tabs.map(tabItem => {
          return (
            <Link href={`/tasks/${task.id}/${tabItem.url}`} key={tabItem.label}>
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

      <hr className="my-8 hidden md:block" />

      <div className="hidden flex-col items-center justify-center md:flex">
        <p className="mb-4 font-light dark:text-white">Your Score</p>
        {/* @TODO Login or show login button */}
        <PieChart points={maxScore} />
      </div>

      <hr className="my-8 hidden md:block" />

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

import { Task } from '@prisma/client'
import { StarIcon as StarIconOutline } from '@heroicons/react/outline'
import { DownloadIcon, StarIcon as StarIconSolid } from '@heroicons/react/solid'
import classNames from 'classnames'
import { FC, Fragment, useMemo, useState } from 'react'
import { Tab } from '@headlessui/react'
import { PieChart } from '../common/PieChart'
import fetcher from '@/lib/fetcher'
import { IGeneralSubmission } from '@/types/submissions'
import useSWR from 'swr'
import Link from 'next/link'

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

export const LeftBar: FC<{
  task: Task
  type: string
}> = ({ task, type }) => {
  const [buttonPressed, setButtonPressed] = useState(false)
  const { data, error } = useSWR<IGeneralSubmission[]>(
    `/api/submissions?filter=own_task&taskId=${task.id}`,
    fetcher
  )

  const maxScore = useMemo(() => {
    return data ? Math.max(...data.map(sub => sub.score), 0) : 0
  }, [data])

  return (
    <section className="w-[16rem]">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <button onClick={() => setButtonPressed(v => !v)}>
            {buttonPressed ? (
              <StarIconSolid className="w-5 h-5 text-gray-400" />
            ) : (
              <StarIconOutline className="w-5 h-5 text-gray-300" />
            )}
          </button>
          <h1 className="text-lg font-medium">{task.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5" />
          <p className="font-light">{task.id}</p>
        </div>
      </div>

      <hr className="my-8" />

      <div className="flex flex-col shrink font-display">
        {Tabs.map(tabItem => {
          return (
            <Link href={`${task.id}/${tabItem.url}`} key={tabItem.label}>
              <button
                key={tabItem.label}
                className={classNames(
                  'flex h-9 w-full items-center justify-center rounded-md transition-colors',
                  type === tabItem.value ? 'bg-gray-100' : 'hover:bg-gray-50'
                )}
              >
                <p className="text-sm text-gray-500">{tabItem.label}</p>
              </button>
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
          className="w-full mb-4 font-light text-center"
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

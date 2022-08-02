import { FC, memo, useMemo } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { Task, Submission } from '@prisma/client'
import { ColumnDef, useReactTable } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { IGeneralSubmission } from '@/types/submissions'

import ViewSubmissionTab from './ViewSubmissionTab'

const Columns = [
  {
    title: 'Submission Time',
    field: 'submittedAt'
  },
  {
    title: 'Name',
    field: 'userId'
  },
  {
    title: 'Score',
    field: 'score'
  },
  {
    title: 'Language',
    field: 'language'
  },
  {
    title: 'Time',
    field: 'time'
  },
  {
    title: 'Memory',
    field: 'memory'
  }
]

const NewColumns: ColumnDef<Submission>[] = [
  {
    id: 'submittedAt',
    cell: props => <span>SubmittedAt</span>
  }
]

const L = () => {
  return <h1>hi</h1>
}

const SubmissionsTab: FC<{ task: Task }> = ({ task }) => {
  // const table = useReactTable({ columns: NewColumns })
  const { data, error } = useSWR<IGeneralSubmission[]>(
    `/api/submissions?filter=task&taskId=${task.id}`,
    fetcher
  )

  return (
    <table className="w-full table-auto border-separate border-spacing-y-3 text-sm">
      <thead className="text-gray-500">
        <tr>
          {Columns.map(({ title, field }) => (
            <th key={field} className="py-2 text-center font-light">
              <button className="group flex w-full items-center justify-center gap-1">
                <p className="text-gray-500 transition-colors group-hover:text-gray-600">
                  {title}
                </p>

                <ChevronUpIcon className="h-3 w-3 text-gray-400 transition-colors group-hover:text-gray-500" />
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-gray-500">
        {!error &&
          data &&
          data.map(sub => {
            const dt = new Date(sub.submittedAt)
            return (
              <tr
                key={sub.id}
                className="bg-white shadow-md transition-colors hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <p className="font-medium">
                      {dayjs(dt).format('DD MMM YYYY')}
                    </p>
                    <p className="text-gray-400">
                      {dayjs(dt).format('HH:mm:ss')}
                    </p>
                  </div>
                </td>
                <td className="py-4">
                  <p className="text-center font-medium">{sub.user.username}</p>
                </td>
                <td className="py-4">
                  <div className="mx-auto flex h-auto w-28 items-center justify-center">
                    <div className="flex h-auto w-full flex-col items-center justify-around">
                      <div className="relative h-full w-full">
                        <div className="absolute h-1.5 w-full rounded-full bg-gray-100" />
                        <div
                          className={`absolute h-1.5 rounded-full ${
                            sub.score === task.fullScore
                              ? 'bg-blue-500'
                              : 'bg-gray-500'
                          }`}
                          style={{
                            width: `${(sub.score / 100) * 100}%`
                          }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        {sub.score} points
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <p className="text-center font-medium">{sub.language}</p>
                </td>
                <td className="py-4">
                  <p className="text-center font-medium">
                    {sub.time}{' '}
                    <span className="font-light text-gray-400">ms</span>
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-center font-medium">
                    {sub.memory}{' '}
                    <span className="font-light text-gray-400">kb</span>
                  </p>
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

const SubmissionTabRouter: FC<{ task: Task; submissionID: null | number }> = ({
  task,
  submissionID
}) => {
  if (submissionID)
    return <ViewSubmissionTab task={task} submissionID={submissionID} />
  else return <SubmissionsTab task={task} />
}

export default SubmissionTabRouter

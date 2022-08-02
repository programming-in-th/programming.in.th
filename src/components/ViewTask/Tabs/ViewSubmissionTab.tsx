import { FC } from 'react'

import { ArrowNarrowLeftIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { Task } from '@prisma/client'
import dayjs from 'dayjs'
import Link from 'next/link'
import useSWR from 'swr'

import useSubmissionData from '@/lib/useSubmissionData'
import { IGeneralSubmission } from '@/types/submissions'

import { TaskStatus } from '../Elements/TaskStatus'

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

const ViewSubmissionTab: FC<{ task: Task; submissionID: number }> = ({
  task,
  submissionID
}) => {
  // const { data, error } = useSWR<IGeneralSubmission>(
  //   `/api/submissions?filter=own_task&taskId=${task.id}`,
  //   fetcher
  // )

  const { submission } = useSubmissionData(submissionID)

  const { data, error } = {
    data: {
      id: 103,
      user: {
        id: 'bruh',
        username: 'iammarkps',
        name: null,
        email: null,
        emailVerified: null,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      score: 34,
      language: 'cpp',
      time: 304,
      memory: 105,
      submittedAt: new Date()
    } as any,
    error: null
  }

  const dt = new Date(data.submittedAt)

  return (
    <div>
      {
        // TODO : go back 1 level
      }
      <Link href="/" passHref>
        <a className="flex items-center gap-2 text-sm text-prog-gray-500 hover:text-gray-600">
          <ArrowNarrowLeftIcon className="h-5 w-5" />
          <p>Back</p>
        </a>
      </Link>
      {
        // ! disgusting code alert - will move to component
      }
      <table className="mt-6 w-full table-auto border-separate border-spacing-y-3 rounded-md bg-white text-sm shadow-md">
        <thead className="">
          <tr>
            {Columns.map(({ title, field }) => (
              <th key={field} className="py-2 text-center font-light">
                <p className="w-full text-gray-400">{title}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-500">
          {!error && data && (
            <tr className="">
              <td className="px-6 py-2">
                <div className="flex flex-col">
                  <p className="font-medium">
                    {dayjs(dt).format('DD MMM YYYY')}
                  </p>
                  <p className="text-gray-400">
                    {dayjs(dt).format('HH:mm:ss')}
                  </p>
                </div>
              </td>
              <td className="py-2">
                <p className="text-center font-medium">{data.user.username}</p>
              </td>
              <td className="py-2">
                <div className="mx-auto flex h-auto w-28 items-center justify-center">
                  <div className="flex h-auto w-full flex-col items-center justify-around">
                    <div className="relative h-full w-full">
                      <div className="absolute h-1.5 w-full rounded-full bg-gray-100" />
                      <div
                        className={`absolute h-1.5 rounded-full ${
                          data.score === task.fullScore
                            ? 'bg-blue-500'
                            : 'bg-gray-500'
                        }`}
                        style={{
                          width: `${(data.score / 100) * 100}%`
                        }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      {data.score} points
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-2">
                <p className="text-center font-medium">{data.language}</p>
              </td>
              <td className="py-2">
                <p className="text-center font-medium">
                  {data.time}{' '}
                  <span className="font-light text-gray-400">ms</span>
                </p>
              </td>
              <td className="px-6 py-2">
                <p className="text-center font-medium">
                  {data.memory}{' '}
                  <span className="font-light text-gray-400">kb</span>
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <pre className="rounded-mg mt-8 overflow-auto bg-slate-800 p-4 text-sm text-white">
        {submission.code}
      </pre>

      <TaskStatus />
    </div>
  )
}

export default ViewSubmissionTab

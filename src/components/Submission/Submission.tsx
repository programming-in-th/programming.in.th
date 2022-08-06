import { Suspense } from 'react'

import dynamic from 'next/dynamic'

import { Task } from '@prisma/client'
import dayjs from 'dayjs'

import { Loading } from '@/components/Loading'
import useSubmissionData from '@/lib/useSubmissionData'

import { SubmissionGroup } from './Group'
import { CodeSkeleton } from '../Code'

const DynamicCode = dynamic(() => import('../Code'), {
  suspense: true
})

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
  { title: 'Status', field: 'status' },
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

const Submission = ({
  task,
  submissionID
}: {
  task: Task
  submissionID: number
}) => {
  const { submission, isLoading } = useSubmissionData(submissionID)

  if (isLoading || task === undefined) {
    return <Loading />
  }

  return (
    <div className="w-full">
      {
        // TODO : go back 1 level
      }
      {/* <Link href="/" passHref>
        <a className="flex items-center gap-2 text-sm text-prog-gray-500 hover:text-gray-600">
          <ArrowNarrowLeftIcon className="h-5 w-5" />
          <p>Back</p>
        </a>
      </Link> */}
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
          {submission && (
            <tr className="">
              <td className="px-6 py-2">
                <div className="flex flex-col">
                  <p className="font-medium">
                    {dayjs(new Date(submission.submittedAt)).format(
                      'DD MMM YYYY'
                    )}
                  </p>
                  <p className="text-gray-400">
                    {dayjs(new Date(submission.submittedAt)).format('HH:mm:ss')}
                  </p>
                </div>
              </td>
              <td className="py-2">
                <p className="text-center font-medium">
                  {submission.user.username}
                </p>
              </td>
              <td className="py-2">
                <div className="mx-auto flex h-auto w-28 items-center justify-center">
                  <div className="flex h-auto w-full flex-col items-center justify-around">
                    <div className="relative h-full w-full">
                      <div className="absolute h-1.5 w-full rounded-full bg-gray-100" />
                      <div
                        className={`absolute h-1.5 rounded-full ${
                          submission.score === task.fullScore
                            ? 'bg-blue-500'
                            : 'bg-gray-500'
                        }`}
                        style={{
                          width: `${(submission.score / 100) * 100}%`
                        }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      {submission.score} points
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-2">
                <p className="text-center font-medium">{submission.status}</p>
              </td>
              <td className="py-2">
                <p className="text-center font-medium">{submission.language}</p>
              </td>
              <td className="py-2">
                <p className="text-center font-medium">
                  {submission.time}{' '}
                  <span className="font-light text-gray-400">ms</span>
                </p>
              </td>
              <td className="px-6 py-2">
                <p className="text-center font-medium">
                  {submission.memory}{' '}
                  <span className="font-light text-gray-400">kB</span>
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* <p>{submission.status}</p> */}
      {/* <Suspense fallback={<CodeSkeleton />}>
        <DynamicCode code={submission.code[0]} language="cpp" />
      </Suspense> */}
      <CodeSkeleton />
      <SubmissionGroup groups={submission.groups} />
    </div>
  )
}

export default Submission

import Link from 'next/link'

import { Task } from '@prisma/client'
import clsx from 'clsx'
import dayjs from 'dayjs'

import useSubmissionList from '@/lib/useSubmissionList'
import { IGeneralSubmission } from '@/types/submissions'

const Columns = [
  {
    title: 'Time',
    field: 'submittedAt',
    width: 'w-[10rem]',
    child: (sub: IGeneralSubmission) => {
      const dt = new Date(sub.submittedAt)
      return (
        <div className="flex flex-col">
          <p className="font-medium">{dayjs(dt).format('DD MMM YYYY')}</p>
          <p className="text-gray-400 dark:text-gray-300">
            {dayjs(dt).format('HH:mm:ss')}
          </p>
        </div>
      )
    }
  },
  {
    title: 'Name',
    field: 'userId',
    width: 'w-[16rem]',
    child: (sub: IGeneralSubmission) => (
      <p className="truncate text-center font-medium">{sub.user?.username}</p>
    )
  },
  {
    title: 'Score',
    field: 'score',
    width: 'w-[10rem]',
    child: (sub: IGeneralSubmission, task: Task) => (
      <div className="flex h-auto w-28 items-center justify-center">
        <div className="flex h-auto w-full flex-col items-center justify-around">
          <div className="relative h-full w-full">
            <div className="absolute h-1.5 w-full rounded-full bg-gray-100" />
            <div
              className={`absolute h-1.5 rounded-full ${
                sub.score === task.fullScore ? 'bg-blue-500' : 'bg-gray-500'
              }`}
              style={{
                width: `${(sub.score / 100) * 100}%`
              }}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-200">
            {sub.score} points
          </p>
        </div>
      </div>
    )
  },
  {
    title: 'Language',
    field: 'language',
    width: 'w-[6rem]',
    child: (sub: IGeneralSubmission) => (
      <p className="text-center font-medium">{sub.language}</p>
    )
  },
  {
    title: 'Time',
    field: 'time',
    width: 'w-[6rem]',
    child: (sub: IGeneralSubmission) => (
      <p className="text-center font-medium">
        {sub.time}{' '}
        <span className="font-light text-gray-400 dark:text-gray-300">ms</span>
      </p>
    )
  },
  {
    title: 'Memory',
    field: 'memory',
    width: 'w-[6rem]',
    child: (sub: IGeneralSubmission) => (
      <p className="text-center font-medium">
        {sub.memory}{' '}
        <span className="font-light text-gray-400 dark:text-gray-300">kB</span>
      </p>
    )
  }
]

const SubmissionsTab = ({ task }: { task: Task }) => {
  const { submissions, isLoadingMore, isReachingEnd, size, setSize } =
    useSubmissionList(task.id)

  return (
    <div className="flex flex-shrink flex-col">
      <div className="flex w-full">
        {Columns.map(column => (
          <p
            key={column.field}
            className={clsx('flex justify-center text-sm', column.width)}
          >
            {column.title}
          </p>
        ))}
      </div>
      <div className="mt-2 flex flex-col space-y-2">
        {submissions.map(sub => (
          <Link href={`/submissions/${sub.id}`} passHref key={sub.id}>
            <a className="flex w-full rounded-xl py-3 font-display shadow-md transition hover:shadow-lg dark:bg-slate-700">
              {Columns.map(column => (
                <div
                  key={column.title}
                  className={clsx(
                    'flex min-w-0 items-center justify-center text-sm',
                    column.width
                  )}
                >
                  {column.child(sub, task)}
                </div>
              ))}
            </a>
          </Link>
        ))}
      </div>
      <button
        disabled={isLoadingMore || isReachingEnd}
        onClick={() => setSize(size + 1)}
      >
        {isLoadingMore
          ? 'Loading...'
          : isReachingEnd
          ? 'No more submissions'
          : 'Load more'}
      </button>
    </div>
  )
}

export default SubmissionsTab

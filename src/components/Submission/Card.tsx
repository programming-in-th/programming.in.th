import { Task } from '@prisma/client'
import clsx from 'clsx'
import dayjs from 'dayjs'

import IsLink from '@/components/common/IsLink'
import { IGeneralSubmission, IListSubmission } from '@/types/submissions'
import { getDisplayNameFromGrader } from '@/utils/language'

const getColumn = (
  isViewing: boolean
): {
  title: string
  field: string
  width: string
  child: (sub: IGeneralSubmission | IListSubmission, task: Task) => JSX.Element
}[] => [
  {
    title: 'Time',
    field: 'submittedAt',
    width: 'w-[10rem]',
    child: sub => {
      const dt = new Date(sub.submittedAt)
      return (
        <div className="flex flex-col text-sm">
          <p className="font-medium text-gray-500 dark:text-white">
            {dayjs(dt).format('DD MMM YYYY')}
          </p>
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
    width: 'w-[18em]',
    child: sub => (
      <p className="truncate text-center text-sm font-medium text-gray-500 dark:text-white">
        {sub.user?.username}
      </p>
    )
  },
  {
    title: 'Score',
    field: 'score',
    width: 'w-[10rem]',
    child: (sub, task) => (
      <div className="flex h-auto w-full items-center justify-center text-sm">
        <div className="flex h-auto w-full flex-col items-center justify-around">
          <div className="relative h-full w-full">
            <div className="absolute h-1.5 w-full rounded-full bg-gray-100" />
            <div
              className={`absolute h-1.5 rounded-full ${
                sub.score === task.fullScore ? 'bg-blue-500' : 'bg-gray-500'
              }`}
              style={{
                width: `${(sub.score / task.fullScore) * 100}%`
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
    title: 'Status',
    field: 'status',
    width: isViewing ? 'hidden -mx-2' : 'w-[14rem]',
    child: sub => (
      <p className="text-center text-sm font-medium text-gray-500 dark:text-white">
        {'status' in sub && sub.status}
      </p>
    )
  },
  {
    title: 'Language',
    field: 'language',
    width: 'w-[7rem]',
    child: sub => (
      <p className="text-center text-sm font-medium text-gray-500 dark:text-white">
        {getDisplayNameFromGrader(sub.language)}
      </p>
    )
  },
  {
    title: 'Time',
    field: 'time',
    width: 'w-[7rem]',
    child: sub => (
      <p className="text-center text-sm font-medium text-gray-500 dark:text-white">
        {sub.time}{' '}
        <span className="font-light text-gray-400 dark:text-gray-300">ms</span>
      </p>
    )
  },
  {
    title: 'Memory',
    field: 'memory',
    width: 'w-[7rem]',
    child: sub => (
      <p className="text-center text-sm font-medium text-gray-500 dark:text-white">
        {sub.memory}{' '}
        <span className="font-light text-gray-400 dark:text-gray-300">kB</span>
      </p>
    )
  }
]

export const Header = ({ isViewing = false }: { isViewing?: boolean }) => {
  const Columns = getColumn(isViewing)
  return (
    <div className="hidden w-full md:flex">
      {Columns.map(column => (
        <p
          key={column.field}
          className={clsx(
            'my-1 flex min-w-0 items-center justify-center px-2 text-sm text-gray-400',
            column.width
          )}
        >
          {column.title}
        </p>
      ))}
    </div>
  )
}

export const Card = ({
  sub,
  task,
  isViewing = false
}: {
  sub: IListSubmission
  task: Task
  isViewing?: boolean
}) => {
  const columns = getColumn(isViewing)

  const [stime, name, score, _status, lang, time, mem] = columns.map(item =>
    item.child(sub, task)
  )

  return (
    <IsLink
      href={`/submissions/${sub.id}`}
      isLink={isViewing}
      className="flex w-full flex-col rounded-xl px-6 py-3 font-display shadow-md transition hover:shadow-lg dark:bg-slate-700 md:flex-row md:px-0"
    >
      <>
        {columns.map(column => (
          <div
            key={column.title}
            className={clsx(
              'hidden min-w-0 items-center justify-center px-2 text-sm md:flex',
              column.width
            )}
          >
            {column.child(sub, task)}
          </div>
        ))}
        <div className="flex w-full justify-between border-b pb-2 md:hidden">
          <div className="w-1/2">{stime}</div>
          <div className="flex w-1/2 justify-end">{name}</div>
        </div>
        <div className="flex justify-between pt-2 md:hidden">
          <div className="w-1/3">{score}</div>
          <div className="flex w-2/3 pl-4">
            <div className="w-1/3">{lang}</div>
            <div className="w-1/3">{time}</div>
            <div className="w-1/3">{mem}</div>
          </div>
        </div>
      </>
    </IsLink>
  )
}

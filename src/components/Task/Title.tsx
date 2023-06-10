'use client'

import { StarIcon as StarIconOutline } from '@heroicons/react/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/solid'
import { Task } from '@prisma/client'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import useSWR, { mutate } from 'swr'

import fetcher from '@/lib/fetcher'

export const Title = ({
  task,
  assessmentId
}: {
  task: Task
  assessmentId?: string
}) => {
  const { status } = useSession()

  const { data: bookmark } = useSWR<boolean>(
    task && status === 'authenticated'
      ? `/api/bookmarks/task/${task.id}`
      : null,
    fetcher
  )

  return (
    <div className="z-10 flex w-full flex-row-reverse justify-between space-x-2 px-2 md:flex-row md:justify-start md:px-0">
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
        <p
          className={clsx(
            'w-full break-all text-lg font-medium dark:text-white',
            task === undefined && 'rounded bg-gray-200 dark:bg-slate-700'
          )}
        >
          {task?.title}
        </p>
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
  )
}

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { IGeneralTask } from '@/types/tasks'

export const TaskItem = (
  task: IGeneralTask & { showTags: string[] | boolean }
) => {
  const [bookmark, setBookmark] = useState<boolean>(false)
  const [tagStatus, setTag] = useState<boolean>(false)

  useEffect(() => {
    if (typeof task.showTags === 'boolean') {
      setTag(task.showTags)
    }
  }, [task.showTags])

  return (
    <div className="group flex w-full items-center justify-between p-2">
      <Link href={`/tasks/${task.id}`}>
        <a className="flex w-full rounded-xl px-6 py-3 font-display shadow-sm transition group-hover:shadow-md dark:bg-slate-700">
          <div className="flex w-full flex-col ">
            <p className="text-sm font-medium text-gray-500 dark:text-white">
              {task.title}
            </p>
            <p className="text-sm text-gray-400">{task.id}</p>
          </div>
          <div className="flex w-full items-center justify-center">
            {task.tags.map((tag: string) => {
              if (
                tagStatus === true ||
                (Array.isArray(task.showTags) && task.showTags.includes(tag))
              ) {
                return (
                  <div
                    className="mx-1 rounded-lg bg-gray-100 px-2 text-sm text-gray-500"
                    key={`tag-${task.id}-${tag}`}
                  >
                    {tag}
                  </div>
                )
              }
            })}
            {tagStatus !== true && (
              <p
                className="text-sm text-gray-400 dark:text-gray-100"
                onClick={event => {
                  event.preventDefault()
                  event.stopPropagation()
                  setTag(true)
                }}
              >{`show all tag >`}</p>
            )}
          </div>
          <div className="flex w-full items-center justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-100">
              {task.solved}
            </p>
          </div>
          <div className="mx-3 flex h-auto w-28 flex-none items-center justify-center">
            <div className="flex h-auto w-full flex-col items-center justify-around">
              <div className="relative h-full w-full">
                <div className="absolute h-1.5 w-full rounded-full bg-gray-100" />
                <div
                  className={`absolute h-1.5 rounded-full ${
                    task.score === task.fullScore
                      ? 'bg-blue-500'
                      : 'bg-gray-500 dark:bg-slate-500'
                  }`}
                  style={{
                    width: `${(task.score / task.fullScore) * 100}%`
                  }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-100">
                {task.score} points
              </p>
            </div>
          </div>
        </a>
      </Link>
      <div className="w-14 p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setBookmark(!bookmark)}
          className={`${
            bookmark
              ? 'fill-gray-500 stroke-gray-500 dark:fill-amber-400 dark:stroke-amber-400'
              : 'hidden stroke-gray-200 group-hover:block '
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </div>
    </div>
  )
}

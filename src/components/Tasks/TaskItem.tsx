import { useEffect, useMemo, useState } from 'react'

import Link from 'next/link'

import { useSWRConfig } from 'swr'

import { IGeneralTask } from '@/types/tasks'

export const TaskItem = (
  task: IGeneralTask & {
    showTags: boolean
    bookmarked: boolean
    tagFilter: string[]
  }
) => {
  const { mutate } = useSWRConfig()
  const [bookmark, setBookmark] = useState<boolean>(task.bookmarked)
  const [tagStatus, setTag] = useState<boolean>(task.showTags)

  useEffect(() => {
    setBookmark(task.bookmarked)
  }, [task.bookmarked])

  useEffect(() => {
    setTag(task.showTags)
  }, [task.showTags])

  const showAllTagsVisible = useMemo(() => {
    return !tagStatus && task.tags.some(tag => !task.tagFilter.includes(tag))
  }, [tagStatus, task.tagFilter, task.tags])

  return (
    <>
      <div className="px-4 py-2 md:hidden">
        <Link
          href={`/tasks/${task.id}`}
          className="flex w-full flex-col divide-y divide-gray-200 rounded-xl px-6 py-1 shadow-md transition dark:bg-slate-700"
        >
          <div className="flex flex-col p-2">
            <p className="text-gray-500 dark:text-gray-200">{task.title}</p>
            <p className="text-sm font-light text-gray-400 ">{task.id}</p>
          </div>
          <div className="flex w-full justify-between p-2">
            <div className="mt-1 flex flex-col">
              <p className="text-gray-500 dark:text-gray-200">{task.solved}</p>
              <p className="text-sm font-light text-gray-400">solved</p>
            </div>
            <div className="flex h-auto w-28 flex-col items-center justify-around">
              {task.score !== null ? (
                <>
                  <div className="relative w-full">
                    <div className="absolute h-1.5 w-full rounded-full bg-gray-200" />
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
                  <p className="text-sm text-gray-400 dark:text-gray-200">
                    {task.score} points
                  </p>
                </>
              ) : (
                <>
                  <div className="relative w-full">
                    <div className="absolute h-1.5 w-full animate-pulse rounded-full bg-gray-400" />
                  </div>
                  <div className="h-4 w-20 animate-pulse rounded-sm bg-gray-400" />
                </>
              )}
            </div>
            <div className="-mr-6 w-14 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={async event => {
                  event.preventDefault()
                  event.stopPropagation()
                  setBookmark(!bookmark)

                  await fetch(`/api/bookmarks/${task.id}`, {
                    method: bookmark ? 'DELETE' : 'POST'
                  })

                  mutate('api/bookmarks')
                }}
                className={`${
                  bookmark
                    ? 'fill-gray-500 stroke-gray-500 dark:fill-amber-400 dark:stroke-amber-400'
                    : 'stroke-gray-200 group-hover:block'
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
        </Link>
      </div>
      <div className="group hidden w-full items-center justify-between py-1.5 md:flex">
        <Link
          href={`/tasks/${task.id}`}
          className="flex w-full rounded-xl px-6 py-3 font-display shadow-md transition group-hover:shadow-lg dark:bg-slate-700"
        >
          <div className="flex w-full flex-col">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-100">
              {task.title}
            </p>
            <p className="text-sm text-gray-400">{task.id}</p>
          </div>
          <div className="flex w-full items-center justify-center">
            {task.tags.map((tag: string) => {
              if (tagStatus || task.tagFilter.includes(tag)) {
                return (
                  <div
                    className="mx-1 rounded-xl bg-gray-100 px-4 py-0.5 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-300"
                    key={`tag-${task.id}-${tag}`}
                  >
                    {tag}
                  </div>
                )
              }
            })}
            {showAllTagsVisible && (
              <p
                className="text-sm text-gray-400 dark:text-gray-200"
                onClick={event => {
                  event.preventDefault()
                  event.stopPropagation()
                  setTag(true)
                }}
              >{`Show all tag >`}</p>
            )}
          </div>
          <div className="flex w-full items-center justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-200">
              {task.solved}
            </p>
          </div>
          <div className="mx-3 flex h-auto w-28 flex-none items-center justify-center">
            <div className="flex h-auto w-full flex-col items-center justify-around">
              {task.score !== null ? (
                <>
                  <div className="relative h-full w-full">
                    <div className="absolute h-1.5 w-full rounded-full bg-gray-200" />
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
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-200">
                    {task.score} points
                  </p>
                </>
              ) : (
                <>
                  <div className="relative w-full">
                    <div className="absolute h-1.5 w-full animate-pulse rounded-full bg-gray-400" />
                  </div>
                  <div className="mt-2 h-3.5 w-20 animate-pulse rounded-sm bg-gray-400" />
                </>
              )}
            </div>
          </div>
        </Link>
        <div className="w-14 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={async () => {
              setBookmark(!bookmark)

              await fetch(`/api/bookmarks/${task.id}`, {
                method: bookmark ? 'DELETE' : 'POST'
              })

              mutate('api/bookmarks')
            }}
            className={`${
              bookmark
                ? 'cursor-pointer fill-gray-500 stroke-gray-500 dark:fill-amber-400 dark:stroke-amber-400'
                : 'hidden cursor-pointer stroke-gray-200 group-hover:block'
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
    </>
  )
}

export default TaskItem

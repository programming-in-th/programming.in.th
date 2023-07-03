import { Dispatch, SetStateAction } from 'react'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import clsx from 'clsx'

const Tabs = [
  {
    label: 'All',
    value: 'All'
  },
  {
    label: 'Tried',
    value: 'tried'
  },
  {
    label: 'Solved',
    value: 'solved'
  },
  // {
  //   label: 'Archives',
  //   value: 'archives'
  // },
  {
    label: 'Bookmarked',
    value: 'bookmarked'
  }
]

export const TasksSidebar = ({
  tags,
  tagFilter,
  setTagFilter
}: {
  tags: string[]
  tagFilter: string[]
  setTagFilter: Dispatch<SetStateAction<string[]>>
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const type = searchParams?.get('type')

  return (
    <div>
      <div className="mx-4 hidden w-52 shrink flex-col gap-4 divide-y font-display md:flex">
        <div className="flex shrink flex-col font-display">
          {Tabs.map(tabItem => {
            return (
              <Link
                key={tabItem.value}
                href={{
                  pathname: '/tasks',
                  query:
                    tabItem.value === 'All'
                      ? null
                      : tabItem.value && { type: tabItem.value }
                }}
                type="button"
                className={clsx(
                  'flex h-9 w-full items-center justify-center rounded-md transition-colors',
                  (!type && tabItem.value === null) ||
                    tabItem.value === String(type) ||
                    (tabItem.value === 'All' && !type)
                    ? 'bg-gray-100 dark:bg-slate-700'
                    : 'hover:bg-gray-50 dark:hover:bg-slate-600'
                )}
              >
                <p className="text-sm text-gray-500 dark:text-gray-200">
                  {tabItem.label}
                </p>
              </Link>
            )
          })}
        </div>
        <div className="space-y-6 text-sm text-gray-500 dark:text-gray-200">
          <div className="mt-4 flex items-baseline">
            <p className="grow text-base">Tag Filter</p>
            <p
              className="cursor-pointer hover:text-gray-400"
              onClick={() => {
                setTagFilter([])
              }}
            >
              Reset
            </p>
          </div>
          <div className="space-y-1">
            {tags.map(tag => (
              <div
                key={tag}
                className={clsx(
                  tagFilter.includes(tag)
                    ? 'font-bold text-gray-600 dark:text-gray-300'
                    : 'text-gray-500 dark:text-gray-400',
                  'cursor-pointer'
                )}
                onClick={() => {
                  if (tagFilter.includes(tag)) {
                    setTagFilter(tagFilter.filter(t => t !== tag))
                  } else {
                    setTagFilter([...tagFilter, tag])
                  }
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full px-4 md:hidden">
        <select
          className="my-2 block w-full rounded-md border-gray-800 py-2 pl-3 text-base sm:text-sm"
          onChange={({ target: { value } }) => {
            router.push(`/tasks${value === 'All' ? '' : `?type=${value}`}`)
          }}
          value={type ?? 'All'}
        >
          {Tabs.map(tabItem => {
            return (
              <option key={tabItem.value} value={tabItem.value}>
                {tabItem.label}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

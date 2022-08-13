import { Fragment } from 'react'

import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { Router, useRouter } from 'next/router'
import Link from 'next/link'

const Tabs = [
  {
    label: 'All',
    value: 'undefined'
  },
  {
    label: 'Tried',
    value: 'tried'
  },
  {
    label: 'Solved',
    value: 'solved'
  },
  {
    label: 'Archives',
    value: 'archives'
  },
  {
    label: 'Bookmarked',
    value: 'bookmarked'
  }
]

export const LeftBar = () => {
  const { query, push } = useRouter()
  return (
    <>
      <div className="mx-4 hidden w-52 shrink flex-col font-display md:flex">
        <div className="flex shrink flex-col font-display">
          {Tabs.map(tabItem => {
            return (
              <Link
                href={{
                  pathname: '/tasks',
                  query:
                    tabItem.value === 'undefined'
                      ? null
                      : { type: tabItem.value }
                }}
              >
                <button
                  className={clsx(
                    'flex h-9 w-full items-center justify-center rounded-md transition-colors',
                    tabItem.value === String(query?.type)
                      ? 'bg-gray-100 dark:bg-slate-700'
                      : 'hover:bg-gray-50 dark:hover:bg-slate-600'
                  )}
                >
                  <p className="text-sm text-gray-500 dark:text-gray-200">
                    {tabItem.label}
                  </p>
                </button>
              </Link>
            )
          })}
        </div>
      </div>
      <div className="w-full md:hidden">
        <select
          className="my-2 mx-4 block w-full rounded-md border-gray-800 py-2 pl-3 text-base sm:text-sm"
          onChange={({ target: { value } }) => {
            push({
              pathname: '/tasks',
              query: value === 'undefined' ? null : { type: value }
            })
          }}
        >
          {Tabs.map(tabItem => {
            return (
              <option
                selected={tabItem.value === String(query?.type)}
                value={tabItem.value}
              >
                {tabItem.label}
              </option>
            )
          })}
        </select>
      </div>
    </>
  )
}

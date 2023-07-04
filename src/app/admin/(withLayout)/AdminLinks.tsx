'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import clsx from 'clsx'

const adminTabs = [
  {
    title: 'All Assessments',
    url: 'assessments'
  },
  // {
  //   title: 'Users',
  //   url: 'users'
  // },
  {
    title: 'Tasks',
    url: 'tasks'
  }
]

function useAdminLocation() {
  const pathname = usePathname()

  return pathname.split('/')[2]
}

export const AdminLinks = () => {
  const adminLocation = useAdminLocation()

  return (
    <>
      {adminTabs.map(tab => (
        <Link
          href={`/admin/${tab.url}`}
          key={tab.title}
          className={clsx(
            'flex w-full justify-center rounded-lg py-2 transition',
            adminLocation == tab.url
              ? 'bg-gray-200 dark:bg-gray-700'
              : 'hover:bg-gray-200 hover:dark:bg-gray-700'
          )}
        >
          <p className="text-sm">{tab.title}</p>
        </Link>
      ))}
    </>
  )
}

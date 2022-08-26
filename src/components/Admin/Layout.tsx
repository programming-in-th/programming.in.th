import Link from 'next/link'

import clsx from 'clsx'

import { PageLayout } from '../Layout'

const Tabs = [
  {
    title: 'All Assessments',
    url: 'assessments'
  },
  {
    title: 'Users',
    url: 'users'
  },
  {
    title: 'Tasks',
    url: 'tasks'
  }
]

export const Layout = ({
  children,
  current
}: {
  children: JSX.Element
  current: string
}) => {
  return (
    <PageLayout>
      <div className="flex w-full justify-center">
        <div className="flex w-full max-w-3xl flex-col justify-center px-2 text-gray-500 dark:text-gray-50">
          <div className="flex w-full justify-center">
            <p className="py-8 text-xl font-semibold">Admin</p>
          </div>
          <div className="flex w-full">
            {Tabs.map(tab => (
              <Link href={`/admin/${tab.url}`} key={tab.title}>
                <a
                  className={clsx(
                    'flex w-full justify-center rounded-lg py-2 transition',
                    current == tab.url
                      ? 'bg-gray-200 dark:bg-gray-700'
                      : 'hover:bg-gray-200 hover:dark:bg-gray-700'
                  )}
                >
                  <p className="text-sm">{tab.title}</p>
                </a>
              </Link>
            ))}
          </div>
          {children}
        </div>
      </div>
    </PageLayout>
  )
}

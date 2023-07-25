'use client'

import { useEffect, useMemo, useState } from 'react'

import Link from 'next/link'

import useSWR from 'swr'

import Card from '@/components/Admin/Assessments/Card'
import { IAdminAssessment } from '@/components/Admin/Assessments/EditAssessment/types'
import fetcher from '@/lib/fetcher'
import { IUser } from '@/types/users'

export default function ViewAssessment({
  params
}: {
  params: { assessmentId: string }
}) {
  const id = params.assessmentId

  const { data: assessment } = useSWR<IAdminAssessment>(
    `/api/assessments/${id}`,
    fetcher
  )

  const { data: users } = useSWR<IUser[]>('/api/users', fetcher)

  const assignUsers = useMemo<IUser[]>(() => {
    return (
      assessment?.users.reduce((pre: IUser[], user) => {
        if (users) {
          const current = users?.find(current => current.id == user.userId)
          if (current) return [...pre, current]
        }
        return pre
      }, []) || []
    )
  }, [assessment?.users, users])

  const [searchUsers, setSearchUsers] = useState<IUser[]>([])

  useEffect(() => {
    setSearchUsers(assignUsers)
  }, [assignUsers])

  return (
    <div className="mt-6 flex justify-center space-x-4">
      <Link href="/admin/assessments" className="mt-4 h-6 cursor-pointer">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.70711 16.7071C9.31659 17.0976 8.68342 17.0976 8.2929 16.7071L2.29289 10.7071C1.90237 10.3166 1.90237 9.68342 2.29289 9.29289L8.2929 3.29289C8.68342 2.90237 9.31659 2.90237 9.70712 3.29289C10.0976 3.68342 10.0976 4.31658 9.70712 4.70711L5.41422 9H17C17.5523 9 18 9.44772 18 10C18 10.5523 17.5523 11 17 11L5.41422 11L9.70711 15.2929C10.0976 15.6834 10.0976 16.3166 9.70711 16.7071Z"
            fill="#64748B"
          />
        </svg>
      </Link>

      <div className="flex w-full max-w-6xl space-x-4 text-gray-400">
        <div className="flex w-2/3 flex-col">
          {assessment ? (
            <Card assessment={assessment} />
          ) : (
            <div className="h-48 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-gray-500" />
          )}
          <div className="mb-2 mt-6 flex items-center justify-start space-x-4">
            <p className="text-sm font-semibold text-gray-500 dark:text-white">
              Assigned Students
            </p>
            <input
              type="text"
              className="rounded-md bg-gray-100 px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline"
              placeholder="Search..."
              onChange={async e => {
                const { value } = e.currentTarget
                if (value) {
                  const Fuse = (await import('fuse.js')).default
                  const fuse = new Fuse(assignUsers, {
                    keys: ['username'],
                    threshold: 0.25
                  })
                  setSearchUsers(fuse.search(value).map(val => val.item))
                } else {
                  setSearchUsers(assignUsers)
                }
              }}
            />
          </div>
          <div className="divide-y dark:divide-gray-500">
            {/** TODO Loading User */}
            {searchUsers.map(user => (
              <Link
                key={user.id}
                href={`/admin/assessments/${assessment?.id}/${user.id}`}
                className="flex cursor-pointer items-center space-x-2 px-4 py-2 transition hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.5422 9.99998C15.5422 13.5346 12.6768 16.4 9.14217 16.4C5.60756 16.4 2.74219 13.5346 2.74219 9.99998C2.74219 6.46535 5.60756 3.59998 9.14217 3.59998C12.6768 3.59998 15.5422 6.46535 15.5422 9.99998ZM10.7422 7.59998C10.7422 8.48363 10.0258 9.19998 9.14217 9.19998C8.25852 9.19998 7.54218 8.48363 7.54218 7.59998C7.54218 6.71632 8.25852 5.99998 9.14217 5.99998C10.0258 5.99998 10.7422 6.71632 10.7422 7.59998ZM9.14212 10.8C7.52809 10.8 6.13734 11.7559 5.50517 13.1325C6.3854 14.1536 7.6883 14.8 9.14216 14.8C10.596 14.8 11.8989 14.1536 12.7791 13.1326C12.1469 11.756 10.7562 10.8 9.14212 10.8Z"
                    fill="#94A3B8"
                  />
                </svg>
                <p className="text-sm dark:text-gray-100">{user.username}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex w-1/3 flex-col space-y-2">
          <p className="text-sm dark:text-gray-100">Tasks</p>
          {assessment?.tasks.map(({ title, id }) => (
            <div
              key={id}
              className="flex w-full rounded-xl border border-gray-100 bg-white px-6 py-3 font-display shadow-md transition dark:border-2 dark:border-slate-700 dark:bg-slate-700"
            >
              <div className="flex w-full flex-col items-start">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-200">
                  {title}
                </p>
                <p className="text-sm text-gray-400">{id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

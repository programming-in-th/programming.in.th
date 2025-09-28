import type { JSX } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import clsx from 'clsx'

export const Pagination = ({
  page,
  pageLimit
}: {
  page: number
  pageLimit: number
}) => {
  const router = useRouter()
  // const searchParams = useSearchParams()

  return (
    <div className="justfiy-between mt-4 flex w-full items-center pl-4 pr-4 md:pr-20">
      <div className="w-28">
        {page > 1 && (
          <Link
            href={{ pathname: '/tasks', query: { page: page - 1 } }}
            scroll={false}
            className="flex w-full items-center text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <p className="ml-2 text-sm">Previous</p>
          </Link>
        )}
      </div>
      <div className="flex w-full justify-center text-gray-400 md:space-x-6">
        {Array.from(Array(pageLimit + 1).keys())
          .slice(1)
          .reduce((pre: JSX.Element[], index: number) => {
            const component = (
              <Link
                key={index}
                href={{
                  pathname: '/tasks',
                  query: { page: index }
                }}
                scroll={false}
                className="hidden md:block"
              >
                <p
                  className={clsx(
                    'flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-gray-100',
                    index === page &&
                      'bg-blue-100 text-blue-600 dark:bg-gray-700 dark:text-gray-300'
                  )}
                >
                  {index}
                </p>
              </Link>
            )
            const blankComponent = (
              <p className="hidden h-7 w-7 items-center justify-center md:flex">
                ...
              </p>
            )
            if (pageLimit <= 8) {
              return [...pre, component]
            }

            if (page <= 3 || page + 3 > pageLimit) {
              if (index <= 4 || index + 4 > pageLimit) {
                return [...pre, component]
              }
              if (index === 5) {
                return [...pre, blankComponent]
              }
              return pre
            }

            if (
              index === 1 ||
              index === pageLimit ||
              (index >= page - 2 && index <= page + 2)
            ) {
              return [...pre, component]
            }
            if (index === 2 || index === pageLimit - 1) {
              return [...pre, blankComponent]
            }
            return pre
          }, [])}
        <select
          className="px-4 py-2 md:hidden"
          onChange={({ target: { value } }) =>
            router.push(`/tasks?page=${value}`)
          }
          value={page}
        >
          {Array.from(Array(pageLimit + 1).keys())
            .slice(1)
            .map(index => (
              <option value={index} key={index}>
                {index}
              </option>
            ))}
        </select>
      </div>
      <div className="w-28">
        {page < pageLimit && (
          <Link
            href={{ pathname: '/tasks', query: { page: page + 1 } }}
            scroll={false}
            className="flex w-full items-center justify-end text-gray-400"
          >
            <p className="mr-2 text-sm">Next</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'

import { Popover } from '@headlessui/react'

function PathPopover({ paths, index }: { paths: string[][][]; index: number }) {
  return (
    <Popover>
      <Popover.Button className="flex items-center">
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="box-content rounded-md p-2 text-gray-500 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-slate-600"
        >
          <path d="M1 9L5 5L1 1" stroke="currentColor" />
        </svg>
      </Popover.Button>

      <Popover.Panel className="absolute z-10 mt-2 flex max-h-[calc(100vh-9rem)] flex-col gap-1 overflow-y-auto bg-white py-3 shadow-md dark:bg-slate-700 dark:shadow-slate-900">
        {paths[index].map(path => (
          <Link
            href={`/archive/${path[0]}`}
            key={path.join('/')}
            className="py-1 pl-3 pr-6 text-gray-500 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-600"
          >
            {path[1]}
          </Link>
        ))}
      </Popover.Panel>
    </Popover>
  )
}

export default function Breadcrumb({
  slug,
  paths
}: {
  slug: string[]
  paths: string[][][]
}) {
  return (
    <div className="mx-auto mt-9 flex max-w-7xl items-center gap-6 px-6">
      <Link
        href={`/archive/${slug.slice(0, -1).join('/')}`}
        className="text-gray-500 dark:text-gray-200"
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
            d="M7.14752 14.3642C6.78539 14.7263 6.19828 14.7263 5.83615 14.3642L2.12706 10.6551C1.76494 10.293 1.76494 9.70584 2.12706 9.34372L5.83615 5.63463C6.19828 5.27251 6.78539 5.27251 7.14751 5.63463C7.50964 5.99675 7.50964 6.58387 7.14751 6.94599L5.02138 9.07213L15.7646 9.07213C16.2767 9.07213 16.6918 9.48728 16.6918 9.9994C16.6918 10.5115 16.2767 10.9267 15.7646 10.9267L5.02138 10.9267L7.14752 13.0528C7.50964 13.4149 7.50964 14.002 7.14752 14.3642Z"
            fill="currentColor"
          />
        </svg>
      </Link>
      <div className="box-content flex h-6 grow items-center gap-1 rounded-sm bg-gray-50 px-2 py-1 dark:bg-slate-700">
        <Link
          href="/archive"
          className="rounded-md px-1 text-gray-500 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-slate-600"
        >
          Archive
        </Link>
        {slug.map((path, index) => (
          <div key={path} className="flex items-center ">
            <PathPopover paths={paths} index={index} />
            <Link
              href={`/archive/${slug.slice(0, index + 1).join('/')}`}
              className="rounded-md px-1 text-gray-500 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-slate-600"
            >
              {
                (paths[index].find(
                  value => value[0] == slug.slice(0, index + 1).join('/')
                ) || [])[1]
              }
            </Link>
          </div>
        ))}
        {paths.length > slug.length && (
          <PathPopover paths={paths} index={slug.length} />
        )}
      </div>
    </div>
  )
}

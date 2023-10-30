'use client'

import { useMemo } from 'react'

import Link from 'next/link'

import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { ICategory } from '@/types/categories'
import { IScore } from '@/types/tasks'

export default function CategoryCard({
  category,
  fullScores
}: {
  category: ICategory
  fullScores: Record<string, number>
}) {
  const { data: score } = useSWR<IScore[]>('api/score', fetcher)
  const solved = useMemo(() => {
    if (!score) return undefined
    let res = 0
    for (const taskId of category.taskIds) {
      const taskScore = score?.find(t => t.task_id === taskId)?.max
      if (taskScore === fullScores[taskId]) {
        res++
      }
    }
    return res
  }, [score, category.taskIds, fullScores])
  const total = category.taskIds.length
  return (
    <Link
      key={category.id}
      href={`/archive/${category.path.join('/')}`}
      className="flex"
    >
      <div
        className="grid flex-1 grid-cols-2 items-center gap-6 rounded-lg p-5 dark:bg-slate-700"
        style={{
          boxShadow:
            '0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)'
        }}
      >
        <div className="flex gap-3">
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-0.5 flex-none text-gray-500 dark:text-gray-200"
          >
            <path
              d="M2.57812 6C2.57812 4.89543 3.45635 4 4.5397 4H9.44365L11.4052 6H16.3092C17.3925 6 18.2707 6.89543 18.2707 8V14C18.2707 15.1046 17.3925 16 16.3092 16H4.5397C3.45635 16 2.57812 15.1046 2.57812 14V6Z"
              fill="currentColor"
            />
          </svg>
          <div>
            <h1 className="font-semibold text-gray-500 dark:text-gray-200">
              {category.title}
            </h1>
            {solved === undefined ? (
              <div className="mt-1 h-5 w-16 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-400"></div>
            ) : (
              <p className="mt-1 text-sm text-gray-400">
                {Math.round((solved / total) * 100)}% solved
              </p>
            )}
          </div>
        </div>
        <div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-2  rounded-full bg-prog-primary-500"
              style={{ width: `${Math.round(((solved ?? 0) / total) * 100)}%` }}
            ></div>
          </div>
          {solved === undefined ? (
            <div className="mx-auto mt-3 h-4 w-16 animate-pulse rounded-full bg-gray-100 dark:bg-gray-400"></div>
          ) : (
            <p className="mt-3 text-center text-xs text-gray-400">
              {solved}/{total}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

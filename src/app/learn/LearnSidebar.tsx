'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import clsx from 'clsx'

import { learnSidebarSelects } from './constants'

export const LearnSidebar = () => {
  const searchParams = useSearchParams()

  const level = searchParams.get('level')

  return (
    <div>
      <div className="mx-4 hidden w-52 shrink flex-col gap-4 divide-y font-display md:flex">
        <div className="flex shrink flex-col font-display">
          {learnSidebarSelects.map(learnLevelSelect => {
            return (
              <Link
                key={learnLevelSelect.value}
                href={{
                  pathname: '/learn',
                  query:
                    learnLevelSelect.value === 'overview'
                      ? null
                      : learnLevelSelect.value && {
                          level: learnLevelSelect.value
                        }
                }}
                type="button"
                className={clsx(
                  'flex h-9 w-full items-center justify-center rounded-md transition-colors',
                  (!level && learnLevelSelect.value === null) ||
                    learnLevelSelect.value === String(level) ||
                    (learnLevelSelect.value === 'overview' && !level)
                    ? 'bg-gray-100 dark:bg-slate-700'
                    : 'hover:bg-gray-50 dark:hover:bg-slate-600'
                )}
              >
                <p className="text-sm text-gray-500 dark:text-gray-200">
                  {learnLevelSelect.label}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

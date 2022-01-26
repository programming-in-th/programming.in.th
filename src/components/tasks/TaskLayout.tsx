import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { PageLayout } from 'components/Layout'

import { Loading } from 'components/Loading'

export const TaskLayout = ({ type, metadata, children }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <Loading />
  }

  if (type === 'null') {
    return (
      <PageLayout>
        <div className="mx-auto mt-8 flex w-full flex-grow flex-col">
          <div className="flex flex-grow items-center justify-center">
            <p className="p-8 text-center text-6xl font-extrabold">
              Task not found
            </p>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div
        className={`mx-auto mt-8 flex w-full flex-col transition-all duration-1000 ${
          type === 'solution'
            ? 'md:max-w-4xl'
            : type === 'submissions'
            ? 'md:max-w-5xl'
            : 'md:max-w-6xl'
        }`}
      >
        <div className="flex flex-col">
          <div className="mx-6 flex items-baseline md:mx-0">
            <p className="md:text-3x font-display text-2xl font-medium">
              {metadata.title}
            </p>
          </div>
          <div className="mx-6 flex justify-around md:mx-0 md:mt-2 md:justify-start">
            <Link href={`/tasks/${metadata.id}`}>
              <a
                className={`mt-2 leading-5 md:mt-0 ${
                  type === 'statement' ? 'text-gray-700' : 'text-gray-400'
                }`}
              >
                Statement
              </a>
            </Link>
            <Link href={`/tasks/${metadata.id}/submissions`}>
              <a
                className={`mt-2 leading-5 md:ml-6 md:mt-0 ${
                  type === 'submissions' ? 'text-gray-700' : 'text-gray-400'
                }`}
              >
                Submissions
              </a>
            </Link>
            <Link href={`/tasks/${metadata.id}/solution`}>
              <a
                className={`mt-2 leading-5 md:ml-6 md:mt-0 ${
                  type === 'solution' ? 'text-gray-700' : 'text-gray-400'
                }`}
              >
                Solution
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`mb-8 flex w-full ${
          type === 'solution'
            ? 'md:max-w-4xl'
            : type === 'submissions'
            ? 'md:max-w-5xl'
            : 'md:max-w-6xl'
        } mx-auto flex-grow flex-col`}
      >
        {children}
      </div>
    </PageLayout>
  )
}

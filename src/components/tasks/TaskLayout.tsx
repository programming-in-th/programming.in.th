import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Flex, Link as ChakraLink, Heading } from '@chakra-ui/core'

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
        <div className="flex mt-8 flex-col mx-auto w-full flex-grow">
          <div className="flex items-center justify-center flex-grow">
            <p className="text-6xl font-extrabold text-center p-8">
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
        className={`flex mt-8 mx-auto flex-col transition-all duration-1000 w-full ${
          type === 'solution'
            ? 'md:max-w-4xl'
            : type === 'submissions'
            ? 'md:max-w-5xl'
            : 'md:max-w-6xl'
        }`}
      >
        <div className="flex flex-col">
          <div className="flex items-baseline mx-6 md:mx-0">
            <p className="font-medium text-2xl md:text-3xl">{metadata.title}</p>
          </div>
          <div className="flex justify-around md:justify-start mx-6 md:mx-0 md:mt-2">
            <Link href={`/tasks/${metadata.id}`}>
              <a
                className={`mt-2 md:mt-0 leading-5 ${
                  type === 'statement' ? 'text-gray-700' : 'text-gray-400'
                }`}
              >
                Statement
              </a>
            </Link>
            <Link href={`/tasks/${metadata.id}/submissions`}>
              <a
                className={`mt-2 md:ml-6 md:mt-0 leading-5 ${
                  type === 'submissions' ? 'text-gray-700' : 'text-gray-400'
                }`}
              >
                Submissions
              </a>
            </Link>
            <Link href={`/tasks/${metadata.id}/solution`}>
              <a
                className={`mt-2 md:ml-6 md:mt-0 leading-5 ${
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
        className={`flex mb-8 w-full ${
          type === 'solution'
            ? 'md:max-w-4xl'
            : type === 'submissions'
            ? 'md:max-w-5xl'
            : 'md:max-w-6xl'
        } flex-col flex-grow mx-auto`}
      >
        {children}
      </div>
    </PageLayout>
  )
}

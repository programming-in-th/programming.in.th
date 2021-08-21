import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSWRInfinite } from 'swr'
import { Box, Flex, Button, Input } from '@chakra-ui/core'

import { SWRfetch } from 'lib/fetch'
import { config } from 'config'

import { ISubmissionList } from '../../@types/submission'

import { arrToObj } from 'utils/arrToObj'
import { insertQueryString } from 'utils/insertQueryString'
import { isObjectEmpty } from 'utils/isEmpty'
import { getTimestamp } from 'utils/getTimestamp'

const submissionCiteria = [
  'submission time',
  'username',
  'task',
  'points',
  'language',
  'time',
  'memory',
]

const submissionToStr = (submission: ISubmissionList) => {
  return [
    getTimestamp(submission.timestamp),
    `${submission.username}`,
    `${submission.taskID}`,
    `${submission.score}`,
    `${arrToObj(config.languageData)[submission.language]}`,
    `${submission.time}`,
    `${submission.memory}`,
  ]
}

export const SubmissionsList = ({ id: taskFrom = undefined }) => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [task, setTask] = useState('')

  useEffect(() => {
    setUsername((router.query.username as string) || '')
    if (taskFrom === undefined) {
      setTask((router.query.task as string) || '')
    }
  }, [router.query])

  useEffect(() => {
    if (taskFrom) {
      setTask(taskFrom)
    }
  }, [])

  const Submissions = () => {
    const pageSize = 10
    const { data, error, size, setSize } = useSWRInfinite(
      (index, previousData) => {
        return `${config.baseURL}/getSubmissions?limit=${pageSize}&next=${
          previousData ? previousData.next : ''
        }&username=${username}&taskID=${task}`
      },
      SWRfetch
    )

    const isLoadingInitialData = !data && !error
    const isLoadingMore =
      isLoadingInitialData || (data && typeof data[size - 1] === 'undefined')
    const isEmpty = data?.[0]?.length === 0
    const isReachingEnd =
      isEmpty || (data && data[data.length - 1]?.next === null)

    return (
      <React.Fragment>
        <div className="mt-4">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {submissionCiteria.map((value) => (
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      key={value}
                    >
                      {value}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map(
                    (submissions: {
                      data: ISubmissionList[]
                      next: string
                    }) => {
                      return submissions.data.map(
                        (submission: ISubmissionList) => (
                          <tr
                            className="transition duration-150 cursor-pointer hover:bg-gray-200"
                            key={submission.submissionID}
                          >
                            {isObjectEmpty(submission) ? (
                              <td
                                className="px-6 py-3 text-sm text-center text-gray-700 whitespace-nowrap"
                                colSpan={7}
                              >
                                Hidden Submission
                              </td>
                            ) : (
                              <React.Fragment>
                                {submissionToStr(submission).map((data) => (
                                  <td>
                                    <Link
                                      href={`/submissions/${submission.submissionID}`}
                                    >
                                      <a>
                                        <div className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">
                                          {data}
                                        </div>
                                      </a>
                                    </Link>
                                  </td>
                                ))}
                              </React.Fragment>
                            )}
                          </tr>
                        )
                      )
                    }
                  )}
              </tbody>
            </table>
          </div>
        </div>
        <button
          type="button"
          className={`font-semibold mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-md rounded-md ${
            isLoadingMore || isReachingEnd
              ? 'text-gray-500 bg-gray-50 hover:bg-gray-100'
              : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => {
            if (!isReachingEnd) {
              setSize((size) => size + 1)
            }
          }}
          disabled={isLoadingMore || isReachingEnd}
        >
          {isLoadingMore ? (
            <svg
              className="animate-spin h-6 w-6 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-25"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <React.Fragment>
              {isReachingEnd ? 'No more submission' : 'Load more'}
            </React.Fragment>
          )}
        </button>
      </React.Fragment>
    )
  }

  return (
    <div className="flex flex-col mt-4">
      <div className="flex max-w-full flex-col md:flex-row">
        <input
          type="text"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value)
            insertQueryString('username', event.target.value)
          }}
          value={username}
          placeholder="Username"
          className="flex items-center px-4 h-10 w-48 shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm border-gray-300 rounded-md"
        />
        {taskFrom === undefined && (
          <input
            type="text"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTask(event.target.value)
              insertQueryString('task', event.target.value)
            }}
            value={task}
            placeholder="Task"
            className="flex items-center px-4 h-10 w-48 md:ml-4 mt-4 md:mt-0 shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm border-gray-300 rounded-md"
          />
        )}
      </div>
      <Submissions />
    </div>
  )
}

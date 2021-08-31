import React, { useState, useEffect, useMemo } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

import useSWR from 'swr'

import { Disclosure, Transition } from '@headlessui/react'

import { PageLayout } from 'components/Layout'
import { Code } from 'components/Code'
import { Loading } from 'components/Loading'

import firebase from 'lib/firebase'

import { fetchFromFirebase } from 'utils/fetcher'
import { getTimestamp } from 'utils/getTimestamp'

import { IGroup } from '../../@types/group'
import { IStatus } from '../../@types/status'
import { ISubmission } from '../../@types/submission'
import { isObjectEmpty } from 'utils/isEmpty'

import { config } from 'config'

const SubmissionDetail: NextPage = () => {
  const mapLanguage = useMemo(() => {
    return config.languageData.reduce(
      (o, item) => Object.assign(o, { [item[0]]: item[2] }),
      {}
    )
  }, [])

  const id =
    typeof window !== 'undefined' ? window.location.pathname.split('/')[2] : ''

  const { data: rawSubmission, mutate } = useSWR<ISubmission>(
    ['getSubmission', id],
    (type, id) => fetchFromFirebase(type, { submissionID: id })
  )

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .doc(`submissions/${id}`)
      .onSnapshot((doc) => {
        const data = doc.data()

        mutate(async (oldSub: ISubmission) => {
          return { ...oldSub, ...data }
        })
      })

    return () => {
      unsubscribe()
    }
  }, [id, mutate])

  const submission = useMemo<ISubmission | undefined>(() => {
    if (rawSubmission === undefined) {
      return undefined
    }

    if (rawSubmission.groups === undefined) {
      return rawSubmission
    }

    let groups = rawSubmission.groups
    let index = 1
    for (let i = 0; i < groups.length; ++i) {
      for (let j = 0; j < groups[i].status.length; ++j) {
        groups[i].status[j].index = index++
      }
    }
    return { ...rawSubmission, groups }
  }, [rawSubmission])

  const [currentCodeIndex, setCurrentCodeIndex] = useState<number>(0)

  if (isObjectEmpty(submission)) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center flex-grow">
          <p className="text-6xl font-bold text-center align-center">
            Submission doesn&apos;t exist
          </p>
        </div>
      </PageLayout>
    )
  }

  if (!submission || !submission.task || !submission.status) {
    return <Loading />
  }

  return (
    <PageLayout>
      <div className="flex justify-center align-top width-full sm:px-4 md:p-8">
        <div className="flex flex-col w-full max-w-5xl p-4 overflow-hidden bg-white border-gray-200 md:shadow-lg md:border-b md:rounded-lg">
          <div className="flex flex-col">
            <div className="flex justify-between align-center">
              <p className="text-2xl font-semibold font-display">
                <Link href={`/tasks/${submission.task.id}`}>
                  <a className="hover:text-gray-500">[{submission.task.id}]</a>
                </Link>{' '}
                {submission.task.title}
              </p>
            </div>
            <div className="mt-2">
              <p className="font-medium">Status: {submission.status}</p>
              <p>
                Score: {submission.score}/{submission.fullScore}
              </p>
              <p>Time: {submission.time} ms</p>
              <p>Memory: {submission.memory} KB</p>
              <p>Submitted at: {getTimestamp(submission.timestamp)}</p>
              <p>User: {submission.username}</p>
            </div>
          </div>
          {submission.task.type !== 'normal' && (
            <div className="flex flex-col mt-4">
              {submission.task.fileName.map((name, index) => (
                <button
                  key={`submission-filename-${id}-${index}`}
                  type="button"
                  className={`${
                    index > 0 ? 'ml-4' : ''
                  } inline-flex items-center justify-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                  onClick={() => setCurrentCodeIndex(index)}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
          <Code
            code={submission.code[currentCodeIndex]}
            language={mapLanguage[submission.language]}
          />
          {submission.groups && (
            <React.Fragment>
              {submission.groups.map((group: IGroup, index: number) => (
                <Disclosure key={`submission-disclosure-${id}-${index}`}>
                  {({ open }) => (
                    <div
                      className={`${
                        open && false ? '' : 'border-b'
                      } border-gray-200 py-2`}
                      key={`submission-disclosure-detail-${id}-${index}`}
                    >
                      <Disclosure.Button className="flex justify-between w-full px-6 text-sm font-medium text-left">
                        <p className="font-normal">
                          Subtask #{index + 1} [{group.score}/{group.fullScore}]
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } transition duration-300 h-6 w-6`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-100 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel>
                          <div className="my-2 overflow-auto border border-gray-100 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                  >
                                    #
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                  >
                                    Verdict
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                  >
                                    Time
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                  >
                                    Memory
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                  >
                                    Message
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {group.status.map(
                                  (status: IStatus, groupIdx) => (
                                    <tr
                                      key={`submission-table-${id}-${index}-${groupIdx}`}
                                    >
                                      <td className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">
                                        {status.index}
                                      </td>
                                      <td className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">
                                        {status.verdict}
                                      </td>
                                      <td className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">
                                        {status.time}
                                      </td>
                                      <td className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">
                                        {status.memory}
                                      </td>
                                      <td className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">
                                        {status.message}
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        </Disclosure.Panel>
                      </Transition>
                    </div>
                  )}
                </Disclosure>
              ))}
            </React.Fragment>
          )}
        </div>
      </div>
    </PageLayout>
  )
}

export default SubmissionDetail

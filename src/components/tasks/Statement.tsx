import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'

import { SWRfetch } from 'lib/fetch'
import { config } from 'config'

import { Normal } from './Submit/Normal'
import { Comm } from './Submit/Comm'
import { OutputOnly } from './Submit/OutputOnly'

import { ISubmissionList } from '../../@types/submission'

import { isObjectEmpty, isArrayEmpty } from 'utils/isEmpty'
import { getTimestamp } from 'utils/getTimestamp'
import { useAuth } from 'lib/auth'

export const Statement = ({ metadata }) => {
  const { user, userData } = useAuth()

  const { data: submissions } = useSWR<any>(
    userData?.username !== ''
      ? `${config.baseURL}/getSubmissions?limit=5&username=${
          userData?.username
        }&taskID=${metadata.id || ''}`
      : null,
    SWRfetch
  )

  const Submit = ({ metadata }) => {
    switch (metadata.type) {
      case 'normal':
        return <Normal metadata={metadata}></Normal>

      case 'communication':
        return <Comm metadata={metadata}></Comm>

      case 'output-only':
        return <OutputOnly metadata={metadata}></OutputOnly>
    }
  }

  return (
    <div className="flex flex-col flex-grow h-full md:flex-row">
      <div
        className={`flex mt-4 px-6 md:px-0 flex-col w-full ${
          user ? 'md:w-2/3' : ''
        }`}
      >
        <div className="h-full">
          <object
            className="w-full h-full"
            data={`${config.awsURL}/statements/${metadata.id}.pdf`}
          >
            <p>
              Your browser doesn't support embed PDF viewer please{' '}
              <a
                className="text-gray-600"
                href={`${config.awsURL}/statements/${metadata.id}.pdf`}
                rel="noopener noreferrer"
                target="_blank"
              >
                download Statement
              </a>
            </p>
          </object>
        </div>
      </div>
      {user && (
        <div className="flex flex-col w-full px-4 mt-4 md:px-0 md:pl-10 md:w-1/3">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    SUBMISSION TIME
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    POINTS
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions?.data ? (
                  isArrayEmpty(submissions.data) ? (
                    <tr>
                      <td
                        className="px-6 py-4 text-sm font-medium text-center text-gray-900 whitespace-nowrap"
                        colSpan={2}
                      >
                        No recent submission
                      </td>
                    </tr>
                  ) : (
                    submissions.data.map((submission: ISubmissionList, idx) => {
                      return isObjectEmpty(submission) ? (
                        <tr
                          key={`statement-submission-${metadata.id}-${idx}`}
                          className="transition duration-150 cursor-pointer hover:bg-gray-200"
                        >
                          <td
                            className="px-6 py-3 text-sm text-center text-gray-700 whitespace-nowrap"
                            colSpan={2}
                          >
                            Hidden Submission
                          </td>
                        </tr>
                      ) : (
                        <tr
                          className="transition duration-150 cursor-pointer hover:bg-gray-200"
                          key={`statement-submission-${metadata.id}-${idx}`}
                        >
                          <td>
                            <Link
                              href={`/submissions/${submission.submissionID}`}
                            >
                              <a>
                                <div className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">
                                  {getTimestamp(submission.timestamp)}
                                </div>
                              </a>
                            </Link>
                          </td>
                          <td>
                            <Link
                              href={`/submissions/${submission.submissionID}`}
                            >
                              <a>
                                <div className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">
                                  {submission.score}
                                </div>
                              </a>
                            </Link>
                          </td>
                        </tr>
                      )
                    })
                  )
                ) : (
                  <tr>
                    <td
                      className="px-6 py-3 text-sm font-medium text-center text-gray-900 whitespace-nowrap"
                      colSpan={2}
                    >
                      Loading...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Submit metadata={metadata} />
        </div>
      )}
    </div>
  )
}

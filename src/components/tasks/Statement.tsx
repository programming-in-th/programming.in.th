import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'

import { SWRfetch } from 'lib/fetch'
import { config } from 'config'

import { Normal } from './Submit/Normal'
import { Comm } from './Submit/Comm'
import { OutputOnly } from './Submit/OutputOnly'

import { useUser } from '../UserContext'
import { ISubmissionList } from '../../@types/submission'

import { isObjectEmpty, isArrayEmpty } from 'utils/isEmpty'
import { getTimestamp } from 'utils/getTimestamp'

export const Statement = ({ metadata }) => {
  const { user } = useUser()

  const { data: submissions } = useSWR(
    user.username !== ''
      ? `${config.baseURL}/getSubmissions?limit=5&username=${
          user.username
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
    <div className="flex flex-col md:flex-row h-full flex-grow">
      <div
        className={`flex mt-4 mx-6 md:mx-0 flex-col ${
          user.user ? 'w-3/5' : 'w-full'
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
      {user.user && (
        <div className="flex mt-4 mx-4 md:mx-0 flex-col md:pl-10 w-2/5">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    SUBMISSION TIME
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center"
                        colSpan={2}
                      >
                        No recent submission
                      </td>
                    </tr>
                  ) : (
                    submissions.data.map((submission: ISubmissionList) => {
                      return isObjectEmpty(submission) ? (
                        <tr key="empty">
                          <td
                            className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-center"
                            colSpan={2}
                          >
                            Hided submission
                          </td>
                        </tr>
                      ) : (
                        <tr
                          className="cursor-pointer transition duration-150 hover:bg-gray-200"
                          key={submission.submissionID}
                        >
                          <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                            <Link
                              href={`/submissions/${submission.submissionID}`}
                            >
                              <a>{getTimestamp(submission.timestamp)}</a>
                            </Link>
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                            <Link
                              href={`/submissions/${submission.submissionID}`}
                            >
                              <a>{submission.score}</a>
                            </Link>
                          </td>
                        </tr>
                      )
                    })
                  )
                ) : (
                  <tr>
                    <td
                      className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-center"
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

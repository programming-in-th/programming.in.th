import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import styled from '@emotion/styled'

import { SWRfetch } from 'lib/fetch'
import { config } from 'config'

import { Normal } from './Submit/Normal'
import { Comm } from './Submit/Comm'
import { OutputOnly } from './Submit/OutputOnly'

import { ITask } from '../../@types/task'
import { Th, Td, Table, Tr, TdHide } from '../submissions/ListTable'

import { useUser } from '../UserContext'
import { ISubmissionList } from '../../@types/submission'

import { isObjectEmpty, isArrayEmpty } from 'utils/isEmpty'
import { getTimestamp } from 'utils/getTimestamp'

const PDF: React.FC<React.ObjectHTMLAttributes<HTMLObjectElement>> = (
  props
) => <object className="w-full h-full" {...props} />

const TdLink = ({ children, href, as }) => {
  return (
    <Td>
      <Link href={href} as={as}>
        <a>
          <div className="w-full h-full py-2 px-4">{children}</div>
        </a>
      </Link>
    </Td>
  )
}

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

  const renderSubmit = (metadata: ITask) => {
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
    <div className="flex flex-col sm:flex-row h-full flex-grow">
      <div
        className="flex mt-4 mx-6 sm:mx-0 flex-col"
        style={{ flex: '2 1 80%' }}
      >
        <div className="h-full">
          <PDF data={`${config.awsURL}/statements/${metadata.id}.pdf`}>
            <div>
              Your browser doesn't support embed PDF viewer please{' '}
              <a
                className="text-teal-600 hover:underline"
                href={`${config.awsURL}/statements/${metadata.id}.pdf`}
                rel="noopener noreferrer"
                target="_blank"
              >
                download Statement
              </a>
            </div>
          </PDF>
        </div>
      </div>

      <div
        className="flex mt-4 mx-4 sm:mx-0 flex-col pl-0 sm:pl-10"
        style={{ flex: '2 1 20%' }}
      >
        <div
          className="max-w-full overflow-auto shadow"
          style={{ maxHeight: '400px' }}
        >
          <Table>
            <thead>
              <tr>
                <Th>SUBMISSION TIME</Th>
                <Th>POINTS</Th>
              </tr>
            </thead>
            <tbody>
              {user.user ? (
                submissions?.data ? (
                  isArrayEmpty(submissions.data) ? (
                    <NoRecentSubmission></NoRecentSubmission>
                  ) : (
                    submissions.data.map((submission: ISubmissionList) => {
                      return isObjectEmpty(submission) ? (
                        <Tr>
                          <TdHide colSpan={2} />
                        </Tr>
                      ) : (
                        <Tr key={submission.submissionID}>
                          <TdLink
                            href="/submissions/[id]"
                            as={`/submissions/${submission.submissionID}`}
                          >
                            {getTimestamp(submission.timestamp)}
                          </TdLink>
                          <TdLink
                            href="/submissions/[id]"
                            as={`/submissions/${submission.submissionID}`}
                          >
                            {submission.score}
                          </TdLink>
                        </Tr>
                      )
                    })
                  )
                ) : (
                  <tr>
                    <td colSpan={2}>
                      <div className="text-left sm:text-center p-4">
                        Loading...
                      </div>
                    </td>
                  </tr>
                )
              ) : (
                <NoRecentSubmission></NoRecentSubmission>
              )}
            </tbody>
          </Table>
        </div>

        {renderSubmit(metadata)}
      </div>
    </div>
  )
}

const NoRecentSubmission = () => (
  <tr>
    <td colSpan={2}>
      <div className="text-left sm:text-center p-4">No recent submission</div>
    </td>
  </tr>
)

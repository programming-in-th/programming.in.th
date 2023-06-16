'use client'

import { Suspense } from 'react'

import dynamic from 'next/dynamic'

import { Task } from '@prisma/client'

import { Card, Header } from '@/components/Submission/Card'
import { useSSESubmissionData } from '@/lib/useSubmissionData'

import SubmissionGroup from './Group'
import { CodeSkeleton } from '../Code'

const DynamicCode = dynamic(() => import('../Code'), {
  suspense: true,
  ssr: false
})

const Submission = ({
  task,
  submissionID
}: {
  task: Task
  submissionID: number
}) => {
  const { submission, isLoading } = useSSESubmissionData(submissionID)

  if (isLoading) {
    return (
      <div className="flex w-full flex-col items-center justify-center">
        <svg
          className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
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
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    )
  }

  return (
    <div className="w-full min-w-0">
      <Header />
      {submission && <Card sub={submission} task={task} />}
      <Suspense fallback={<CodeSkeleton />}>
        <DynamicCode
          code={submission!.code[0]}
          language={submission!.language}
        />
      </Suspense>
      {submission && <SubmissionGroup groups={submission.groups} />}
    </div>
  )
}

export default Submission

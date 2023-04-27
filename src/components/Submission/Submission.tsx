import { Suspense } from 'react'

import dynamic from 'next/dynamic'

import { Task } from '@prisma/client'

import { Loading } from '@/components/Loading'
import { Card, Header } from '@/components/Submission/Card'
import { useSSESubmissionData } from '@/lib/useSubmissionData'

import { CodeSkeleton } from '../Code'
import SubmissionGroup from './Group'

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
  const { submission, isLoading, mutate } = useSSESubmissionData(submissionID)

  if (isLoading || task === undefined) {
    return <Loading />
  }

  return (
    <div className="w-full min-w-0">
      <Header />
      <button
        onClick={() => mutate()}
        className="bg-prog-gray-500 text-white dark:hover:bg-slate-600"
      >
        Refresh
      </button>
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

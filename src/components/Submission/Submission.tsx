import { Suspense } from 'react'

import dynamic from 'next/dynamic'

import { Task } from '@prisma/client'

import { Loading } from '@/components/Loading'
import { Card, Header } from '@/components/Submission/Card'
import useSubmissionData from '@/lib/useSubmissionData'

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
  const { submission, isLoading } = useSubmissionData(submissionID)

  if (isLoading || task === undefined) {
    return <Loading />
  }

  return (
    <div className="w-full min-w-0">
      <Header isViewing />
      {submission && <Card sub={submission} task={task} isViewing />}
      <Suspense fallback={<CodeSkeleton />}>
        <DynamicCode code={submission.code[0]} language={submission.language} />
      </Suspense>

      <SubmissionGroup groups={submission.groups} />
    </div>
  )
}

export default Submission

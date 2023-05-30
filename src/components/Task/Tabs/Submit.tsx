'use client'
// TODO Get session on server?

import { Task } from '@prisma/client'
import { useSession } from 'next-auth/react'

import { SubmitElement } from '../SubmitElement'

const SubmitTab = ({
  task,
  assessmentId
}: {
  task: Task
  assessmentId?: string
}) => {
  const { status } = useSession()

  if (status !== 'authenticated') {
    return (
      <div className="flex h-24 items-center justify-center">
        <p className="text-center text-prog-gray-500 dark:text-gray-200">
          You must be logged in to submit code
        </p>
      </div>
    )
  } else
    return (
      <div>
        <SubmitElement task={task} assessmentId={assessmentId} />
      </div>
    )
}

export default SubmitTab

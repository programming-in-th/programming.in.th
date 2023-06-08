import { Task } from '@prisma/client'

import { getServerUser } from '@/lib/session'

import { SubmitElement } from '../SubmitElement'

const SubmitTab = async ({
  task,
  assessmentId
}: {
  task: Task
  assessmentId?: string
}) => {
  const user = await getServerUser()

  if (!user) {
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

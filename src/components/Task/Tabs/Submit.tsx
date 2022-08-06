import { Task } from '@prisma/client'
import { useSession } from 'next-auth/react'

import { SubmitElement } from '../SubmitElement'

const SubmitTab = ({ task }: { task: Task }) => {
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
        <SubmitElement task={task} />
      </div>
    )
}

export default SubmitTab

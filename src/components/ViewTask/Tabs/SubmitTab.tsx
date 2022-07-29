import { Task } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { FC } from 'react'
import { SubmitElement } from '../Elements/SubmitElement'

const SubmitTab: FC<{ task: Task }> = ({ task }) => {
  const { status } = useSession()

  if (status !== 'authenticated') {
    return (
      <div className="flex items-center justify-center h-24">
        <p className="text-prog-gray-500 text-center">
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

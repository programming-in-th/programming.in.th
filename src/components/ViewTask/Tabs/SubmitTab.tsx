import { Task } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { FC } from 'react'
import { SubmitElement } from '../Elements/SubmitElement'

const SubmitTab: FC<{ task: Task }> = ({ task }) => {
  const { status } = useSession()

  if (status !== 'authenticated') {
    return (
      <div className="flex h-24 items-center justify-center">
        <p className="text-center text-prog-gray-500">
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

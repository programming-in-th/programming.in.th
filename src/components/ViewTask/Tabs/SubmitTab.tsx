import { Task } from '@prisma/client'
import { FC } from 'react'
import { SubmitElement } from '../Elements/SubmitElement'

const SubmitTab: FC<{ task: Task }> = ({ task }) => {
  return (
    <div>
      <SubmitElement task={task} />
    </div>
  )
}

export default SubmitTab

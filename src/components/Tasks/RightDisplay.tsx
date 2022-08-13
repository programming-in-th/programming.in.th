import { Dispatch, SetStateAction, useMemo } from 'react'

import { IGeneralTask } from '@/types/tasks'

import { AllTasks } from './All'
import { useRouter } from 'next/router'

const ComingSoonTab = () => {
  return (
    <div className="w-full">
      <p className="text-center text-sm font-medium text-prog-gray-500">
        Coming Soon...
      </p>
    </div>
  )
}

const Tabs = [
  {
    condition: () => true,
    value: 'undefined'
  },
  {
    condition: (task: IGeneralTask) =>
      task.tried && task.score !== task.fullScore,
    value: 'tried'
  },
  {
    condition: (task: IGeneralTask) => task.score === task.fullScore,
    value: 'solved'
  },
  {
    condition: () => true,
    value: 'archives'
  },
  {
    condition: (task: IGeneralTask) => task.bookmarked,
    value: 'bookmarked'
  }
]

export const RightDisplay = ({
  tasks,
  tag,
  setTag
}: {
  tasks: IGeneralTask[]
  tag: boolean
  setTag: Dispatch<SetStateAction<boolean>>
}) => {
  const { query } = useRouter()

  const condition = useMemo(
    () => Tabs.find(tab => tab.value === String(query?.type)).condition,
    [query]
  )

  return (
    <AllTasks tasks={tasks} tag={tag} setTag={setTag} condition={condition} />
  )
}

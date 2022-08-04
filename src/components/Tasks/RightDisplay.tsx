import { Dispatch, SetStateAction } from 'react'

import { Tab } from '@headlessui/react'

import { IGeneralTask } from '@/types/tasks'

import { AllTasks } from './All'

const ComingSoonTab = () => {
  return (
    <div className="w-full">
      <p className="text-center text-sm font-medium text-prog-gray-500">
        Coming Soon...
      </p>
    </div>
  )
}

export const RightDisplay = ({
  tasks,
  tag,
  setTag
}: {
  tasks: IGeneralTask[]
  tag: boolean
  setTag: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <Tab.Panels className="flex w-full flex-col gap-8">
      <Tab.Panel>
        <AllTasks tasks={tasks} tag={tag} setTag={setTag} />
      </Tab.Panel>
      <Tab.Panel>
        <ComingSoonTab />
      </Tab.Panel>
      <Tab.Panel>
        <ComingSoonTab />
      </Tab.Panel>
      <Tab.Panel>
        <ComingSoonTab />
      </Tab.Panel>
      <Tab.Panel>
        <ComingSoonTab />
      </Tab.Panel>
    </Tab.Panels>
  )
}

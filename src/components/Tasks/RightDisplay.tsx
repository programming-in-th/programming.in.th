import { Dispatch, FC, Fragment, SetStateAction } from 'react'
import { Tab } from '@headlessui/react'
import { TaskItem } from './TaskItem'
import { IGeneralTask } from '@/types/tasks'

const SampleTab: FC<{
  tasks: IGeneralTask[]
  tag: boolean
  setTag: Dispatch<SetStateAction<boolean>>
}> = ({ tasks, tag, setTag }) => {
  return (
    <div className="h-full w-full">
      <div className="group flex w-full items-center justify-between px-2">
        <div className="flex w-full px-6 font-display">
          <div className="flex w-full flex-col">
            <p className="text-sm font-medium text-gray-400">Problem Title</p>
          </div>
          <div className="flex w-full items-center justify-center">
            <input
              type="checkbox"
              onChange={() => setTag(!tag)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <p className="ml-2 text-sm font-medium text-gray-400">Show tag</p>
          </div>
          <div className="flex w-full shrink items-center justify-center">
            <p className="text-sm text-gray-400">Solved</p>
          </div>
          <div className="mx-3 flex h-auto w-28 flex-none items-center justify-center">
            <p className="text-sm text-gray-400">Score</p>
          </div>
        </div>
        <div className="w-14 px-4" />
      </div>
      {tasks.map(context => (
        <TaskItem {...context} showTags={tag} key={`task-${context.id}`} />
      ))}
    </div>
  )
}

const ComingSoonTab = () => {
  return (
    <div className="w-full">
      <p className="text-center text-sm font-medium text-prog-gray-500">
        Coming Soon...
      </p>
    </div>
  )
}

export const RightDisplay: FC<{
  tasks: IGeneralTask[]
  tag: boolean
  setTag: Dispatch<SetStateAction<boolean>>
}> = ({ tasks, tag, setTag }) => {
  return (
    <Tab.Panels className="flex w-full flex-col gap-8">
      <Tab.Panel>
        <SampleTab tasks={tasks} tag={tag} setTag={setTag} />
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

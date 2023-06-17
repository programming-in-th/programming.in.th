import { Dispatch, SetStateAction, Suspense } from 'react'

import dynamic from 'next/dynamic'

import { IGeneralTask } from '@/types/tasks'

const DynamicTaskItem = dynamic(() => import('./TaskItem'), {
  suspense: true,
  ssr: false
})

export const Listing = ({
  tasks,
  tag,
  setTag
}: {
  tasks: IGeneralTask[]
  tag: boolean
  setTag: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div className="h-full w-full">
      <div className="group flex w-full items-center justify-between px-2">
        <div className="hidden w-full px-6 font-display md:flex">
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

      <div className="no-scrollbar mt-4 max-h-[calc(100vh-17rem)] overflow-y-auto">
        {tasks.map(context => (
          <Suspense fallback={<>hello</>} key={`task-${context.id}`}>
            <DynamicTaskItem {...context} showTags={tag} />
          </Suspense>
        ))}
      </div>
    </div>
  )
}

export default Listing

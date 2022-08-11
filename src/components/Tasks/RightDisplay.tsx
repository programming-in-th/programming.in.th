import { Dispatch, SetStateAction, useMemo } from 'react'

import { Tab } from '@headlessui/react'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { IGeneralTask } from '@/types/tasks'

import { AllTasks } from './All'
import { Bookmarked } from './Bookmarked'

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
  const { data: bookmarks, error } = useSWR<string[]>('/api/bookmarks', fetcher)
  const taskBookmarks = useMemo(() => {
    return tasks.map(task => ({
      ...task,
      bookmarked: bookmarks && !error ? bookmarks.includes(task.id) : false
    }))
  }, [tasks, bookmarks, error])
  return (
    <Tab.Panels className="flex w-full flex-col gap-8">
      <Tab.Panel>
        <AllTasks tasks={taskBookmarks} tag={tag} setTag={setTag} />
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
        <Bookmarked tasks={taskBookmarks} tag={tag} setTag={setTag} />
      </Tab.Panel>
    </Tab.Panels>
  )
}

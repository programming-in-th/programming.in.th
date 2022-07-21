import { useEffect, useState } from 'react'
import { PageLayout } from '@/components/Layout'
import { TaskItem } from './components/TaskItem'
import { LeftBar } from './components/LeftBar'

const Index = ({ tasks }) => {
  const [tag, setTag] = useState<boolean>(false)

  return (
    <PageLayout>
      <div className="flex w-auto justify-center">
        <div className="flex min-h-screen w-full max-w-7xl flex-col items-center">
          <div className="flex w-full flex-col items-center py-16">
            <p className="text-3xl text-gray-500">Tasks</p>
            <p className="text-md text-gray-500">browse over 700+ tasks</p>
            <input
              className="my-4 w-60 rounded-md border-gray-300 bg-gray-100 px-2 py-1 text-sm shadow-sm"
              placeholder="search..."
            ></input>
          </div>
          <div className="flex w-full">
            <LeftBar />
            <div className="h-full w-full">
              <div className="group flex w-full items-center justify-between px-2">
                <div className="flex w-full px-6 font-display">
                  <div className="flex w-full flex-col">
                    <p className="text-sm font-medium text-gray-400">
                      Problem Title
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-center">
                    <input
                      type="checkbox"
                      onChange={() => setTag(!tag)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <p className="ml-2 text-sm font-medium text-gray-400">
                      Show tag
                    </p>
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
                <TaskItem
                  {...context}
                  showTags={tag}
                  key={`task-${context.id}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default Index

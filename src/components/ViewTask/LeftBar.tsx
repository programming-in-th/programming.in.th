import { Task } from '@/types/tasks'
import { StarIcon as StarIconOutline } from '@heroicons/react/outline'
import { DownloadIcon, StarIcon as StarIconSolid } from '@heroicons/react/solid'
import { FC, useState } from 'react'

// add interfactions as function
export const LeftBar: FC<{ task: Task }> = ({ task }) => {
  const [buttonPressed, setButtonPressed] = useState(false)

  return (
    <section className="w-72">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <button onClick={() => setButtonPressed(v => !v)}>
            {buttonPressed ? (
              <StarIconSolid className="w-5 h-5 text-gray-400" />
            ) : (
              <StarIconOutline className="w-5 h-5 text-gray-300" />
            )}
          </button>
          <h1 className="font-medium text-lg">{task.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5" />
          <p className="font-light">{task.id}</p>
        </div>
      </div>

      <hr className="my-8" />

      <div className="flex shrink flex-col font-display">
        <div className="flex h-9 w-full items-center justify-center rounded-md bg-gray-100">
          <p className="text-sm text-gray-500">Statement</p>
        </div>
        <div className="flex h-9 w-full items-center justify-center rounded-md hover:bg-gray-50">
          <p className="text-sm text-gray-500">Submissions</p>
        </div>
        <div className="flex h-9 w-full items-center justify-center rounded-md hover:bg-gray-50">
          <p className="text-sm text-gray-500">My Submissions</p>
        </div>
        <div className="flex h-9 w-full items-center justify-center rounded-md hover:bg-gray-50">
          <p className="text-sm text-gray-500">Solution</p>
        </div>
      </div>

      <hr className="my-8" />

      <div className="flex flex-col justify-center items-center">
        <p className="font-light mb-4">your score</p>

        <div className="w-48 h-48 bg-slate-400 rounded-lg" />
      </div>

      <hr className="my-8" />

      <h2 className="mb-3">Attatchments</h2>

      <div className="flex flex-col border border-gray-300 rounded-md">
        <button className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
          <p className="">attachmentsfilename...</p>
          <DownloadIcon className="w-5 h-5 text-prog-primary-500" />
        </button>
        <button className="flex justify-between items-center px-5 py-4 border-gray-200">
          <p className="">attachmentsfilename...</p>
          <DownloadIcon className="w-5 h-5 text-prog-primary-500" />
        </button>
      </div>
    </section>
  )
}

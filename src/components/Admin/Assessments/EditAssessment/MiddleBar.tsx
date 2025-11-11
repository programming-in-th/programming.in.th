import { useMemo, useState } from 'react'

import clsx from 'clsx'

import { TaskModel } from '@/prisma/models'
import { IAssessmentTask } from '@/types/assessments'

const TaskCard = ({
  title,
  id,
  selected,
  toggleTask
}: {
  title: string
  id: string
  selected: boolean
  toggleTask: (_id: string, _title: string) => void
}) => (
  <div
    className={clsx(
      'flex w-full cursor-pointer rounded-xl border bg-white px-6 py-3 font-display shadow-md transition dark:border-2 dark:bg-slate-700',
      selected ? 'border-gray-400' : 'border-gray-100 dark:border-slate-700'
    )}
    onClick={() => toggleTask(id, title)}
  >
    <div className="flex w-full flex-col items-start">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-200">
        {title}
      </p>
      <p className="text-sm text-gray-400">{id}</p>
    </div>
  </div>
)

export const MiddleBar = ({
  tasks,
  selectedTasks,
  toggleTask
}: {
  tasks: TaskModel[]
  selectedTasks: Omit<IAssessmentTask, 'fullScore'>[]
  toggleTask: (_id: string, _title: string) => void
}) => {
  const [filteredTasks, setFilteredTasks] = useState<TaskModel[]>(tasks)
  const privateTask = useMemo(
    () => filteredTasks.filter(task => task.private),
    [filteredTasks]
  )
  const publicTask = useMemo(
    () => filteredTasks.filter(task => !task.private),
    [filteredTasks]
  )
  return (
    <div className="flex h-full w-full flex-col pt-4">
      <div className="flex flex-col px-6">
        <p>Choose Tasks</p>
        <input
          type="text"
          className="my-3 rounded-md bg-gray-100 px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline"
          placeholder="Search..."
          onChange={async e => {
            const { value } = e.currentTarget
            if (value) {
              const Fuse = (await import('fuse.js')).default
              const fuse = new Fuse(tasks, {
                keys: ['id', 'title'],
                threshold: 0.25
              })

              setFilteredTasks(fuse.search(value).map(val => val.item))
            } else {
              setFilteredTasks(tasks)
            }
          }}
        />
      </div>
      <div className="flex h-full w-full flex-col overflow-y-auto px-6 py-2">
        <p className="py-2 text-gray-400 dark:text-gray-200">Private Task</p>
        <div className="flex w-full flex-col space-y-2">
          {privateTask.map(task => (
            <TaskCard
              id={task.id}
              title={task.title}
              key={task.id}
              selected={selectedTasks.map(task => task.id).includes(task.id)}
              toggleTask={toggleTask}
            />
          ))}
        </div>
        <p className="mt-4 py-2 text-gray-400 dark:text-gray-200">
          Public Task
        </p>
        <div className="flex w-full flex-col space-y-2">
          {publicTask.map(task => (
            <TaskCard
              id={task.id}
              title={task.title}
              key={task.id}
              toggleTask={toggleTask}
              selected={selectedTasks.map(task => task.id).includes(task.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

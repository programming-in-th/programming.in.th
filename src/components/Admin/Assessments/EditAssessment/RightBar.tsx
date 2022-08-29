import { Dispatch, SetStateAction } from 'react'

import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { useSortable, arrayMove, SortableContext } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { IAssessmentTask } from '@/types/assessments'

const TaskCard = ({
  title,
  id,
  toggleTask
}: {
  title: string
  id: string
  toggleTask: (_id: string, _title: string) => void
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }
  return (
    <div
      className="flex w-full items-center space-x-3"
      ref={setNodeRef}
      style={style}
    >
      <div {...attributes} {...listeners}>
        <svg
          width="7"
          height="12"
          viewBox="0 0 7 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="2" height="2" fill="#CBD5E1" />
          <rect x="5" width="2" height="2" fill="#CBD5E1" />
          <rect x="5" y="5" width="2" height="2" fill="#CBD5E1" />
          <rect y="5" width="2" height="2" fill="#CBD5E1" />
          <rect y="10" width="2" height="2" fill="#CBD5E1" />
          <rect x="5" y="10" width="2" height="2" fill="#CBD5E1" />
        </svg>
      </div>
      <div className="flex w-full items-center justify-between rounded-xl border border-gray-100 bg-white px-6 py-3 font-display shadow-md transition dark:border-slate-700 dark:bg-slate-700">
        <div className="flex w-full flex-col items-start">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-200">
            {title}
          </p>
          <p className="text-sm text-gray-400">{id}</p>
        </div>
        <button
          type="button"
          className="rounded-md p-1 transition hover:bg-gray-200"
          onClick={() => toggleTask(id, title)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export const RightBar = ({
  tasks,
  toggleTask,
  setTasks
}: {
  tasks: Omit<IAssessmentTask, 'fullScore'>[]
  toggleTask: (_id: string, _title: string) => void
  setTasks: Dispatch<SetStateAction<Omit<IAssessmentTask, 'fullScore'>[]>>
}) => {
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return

    if (active.id !== over.id) {
      setTasks(tasks => {
        const oldIndex = tasks.map(task => task.id).indexOf(active.id as string)
        const newIndex = tasks.map(task => task.id).indexOf(over.id as string)

        return arrayMove(tasks, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="flex h-full w-full flex-col pt-4">
      <p className="mb-2 px-6 text-gray-400 dark:text-gray-200">
        Selected task for assessment
      </p>
      <div className="flex h-full w-full flex-col space-y-2 overflow-y-auto rounded-md bg-gray-50 p-6 pl-4 dark:bg-slate-600">
        <DndContext
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={tasks}>
            {tasks.map(task => (
              <TaskCard
                id={task.id}
                title={task.title}
                key={`right-bar-${task.id}`}
                toggleTask={toggleTask}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}

import { Layout } from '@/components/Admin/Layout'
import fetcher from '@/lib/fetcher'
import { Task } from '@prisma/client'
import { useMemo, useState } from 'react'
import useSWR from 'swr'

import VerifyDelete from '@/components/Admin/Assessments/VerifyDelete'
import EditTask from '@/components/Admin/Assessments/EditTask'

const TaskCard = ({ task }: { task: Task }) => {
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  return (
    <>
      <div className="flex w-full rounded-xl border border-gray-100 px-6 py-3 font-display shadow-md transition group-hover:shadow-lg dark:bg-slate-700">
        <div className="flex w-full flex-col">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-100">
            {task.title}
          </p>
          <p className="text-sm text-gray-400">{task.id}</p>
        </div>
        {/* <div className="flex w-full items-center justify-center">
            {task.tags.map((tag: string) => (
              <div
                className="mx-1 rounded-lg bg-gray-100 px-2 text-sm text-gray-500"
                key={`tag-${task.id}-${tag}`}
              >
                {tag}
              </div>
            ))}
          </div> */}
        <div className="flex items-center space-x-1">
          <button
            className="rounded-md p-2 transition hover:bg-gray-200 dark:hover:bg-gray-700"
            type="button"
            onClick={() => setOpenEdit(true)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.4142 2.58579C16.6332 1.80474 15.3668 1.80474 14.5858 2.58579L7 10.1716V13H9.82842L17.4142 5.41421C18.1953 4.63316 18.1953 3.36683 17.4142 2.58579Z"
                fill="#94A3B8"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 6C2 4.89543 2.89543 4 4 4H8C8.55228 4 9 4.44772 9 5C9 5.55228 8.55228 6 8 6H4V16H14V12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12V16C16 17.1046 15.1046 18 14 18H4C2.89543 18 2 17.1046 2 16V6Z"
                fill="#94A3B8"
              />
            </svg>
          </button>
          <button
            type="button"
            className="rounded-md p-2 transition hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setOpenDelete(true)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"
                fill="#94A3B8"
              />
            </svg>
          </button>
        </div>
      </div>
      <VerifyDelete
        open={openDelete}
        setOpen={setOpenDelete}
        id={task.id}
        onDelete={() => console.log('DELETE TASK')}
        isTask
      />
      <EditTask task={task} open={openEdit} setOpen={setOpenEdit} />
    </>
  )
}

const Tasks = () => {
  const { data: tasks } = useSWR<Task[]>('/api/tasks', fetcher)

  const [openNewTask, setOpenNewTask] = useState<boolean>(false)

  const privateTask = useMemo(
    () => (tasks || []).filter(task => task.private),
    [tasks]
  )
  const publicTask = useMemo(
    () => (tasks || []).filter(task => !task.private),
    [tasks]
  )

  return (
    <Layout current="tasks">
      <>
        <div className="flex w-full max-w-6xl flex-col">
          <div
            className="my-6 flex w-full items-center justify-center space-x-2 rounded-md border border-gray-100 py-10 shadow-md transition hover:bg-gray-50"
            onClick={() => setOpenNewTask(true)}
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <p>Create Task</p>
          </div>
          <div className="w-ful flex space-x-4">
            <div className="w-64 flex-none">
              <p className="font-semibold">Tags</p>
            </div>
            <div className="flex w-full flex-col space-y-6">
              <div className="flex w-full flex-col space-y-2">
                <p className="w-full border-b border-gray-200 pb-2">
                  Private Tasks
                </p>
                {privateTask.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
              <div className="flex w-full flex-col space-y-2">
                <p className="w-full border-b border-gray-200 pb-2">
                  Public Tasks
                </p>
                {publicTask.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <EditTask open={openNewTask} setOpen={setOpenNewTask} />
      </>
    </Layout>
  )
}

export default Tasks

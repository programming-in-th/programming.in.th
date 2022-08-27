import { Fragment, useMemo } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Task } from '@prisma/client'

import { IAssessmentwithTask } from '@/types/assessments'

const LeftBar = () => {
  return (
    <div className="flex h-full w-full flex-col space-y-3 overflow-y-auto border-r-[1px] border-gray-300 px-6 py-4">
      <div className="flex flex-col">
        <p>Assessment Name</p>
        <input type="text" className="rounded-md border px-4 py-1" />
      </div>
      <div className="flex flex-col">
        <p>ID</p>
        <input type="text" className="rounded-md border px-4 py-1" />
      </div>
      <div className="flex flex-col">
        <p>Description</p>
        <textarea className="h-28 rounded-md border px-4 py-1" />
      </div>
      <div className="flex flex-col">
        <p>Instruction</p>
        <textarea className="h-28 rounded-md border px-4 py-1" />
      </div>
      <div className="flex flex-col">
        <p>Open At</p>
        <input
          type="datetime-local"
          className="rounded-md border px-4 py-1"
        ></input>
      </div>
      <div className="flex flex-col">
        <p>Closed At</p>
        <input
          type="datetime-local"
          className="rounded-md border px-4 py-1"
        ></input>
      </div>
      <div className="flex flex-col">
        <p>Assign to</p>
        <div className="flex h-52 flex-col overflow-y-auto rounded-md border border-gray-200 p-0.5">
          <input
            type="text"
            className="rounded-md bg-gray-100 px-4 py-1"
            placeholder="Search..."
          ></input>
        </div>
      </div>
      <div className="flex flex-col">
        <p>Assign to</p>
        <div className="flex h-52 flex-col overflow-y-auto rounded-md border border-gray-200 p-0.5">
          <input
            type="text"
            className="rounded-md bg-gray-100 px-4 py-1"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
  )
}

const TaskCard = ({ title, id }: { title: string; id: string }) => (
  <div className="flex w-full rounded-xl bg-white px-6 py-3 font-display shadow-md transition dark:bg-slate-700">
    <div className="flex w-full flex-col">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-100">
        {title}
      </p>
      <p className="text-sm text-gray-400">{id}</p>
    </div>
  </div>
)

const MiddleBar = ({ tasks }: { tasks: Task[] }) => {
  const privateTask = useMemo(() => tasks.filter(task => task.private), [tasks])
  const publicTask = useMemo(() => tasks.filter(task => !task.private), [tasks])
  return (
    <div className="flex h-full w-full flex-col pt-4">
      <div className="flex flex-col px-6">
        <p>Choose Tasks</p>
        <input
          type="text"
          className="my-3 rounded-md bg-gray-100 px-4 py-1"
          placeholder="Search..."
        />
      </div>
      <div className="flex h-full w-full flex-col overflow-y-auto px-6 py-2">
        <p className="py-2 text-gray-400">Private Task</p>
        <div className="flex w-full flex-col space-y-1">
          {privateTask.map(task => (
            <TaskCard id={task.id} title={task.title} key={task.id} />
          ))}
        </div>
        <p className="mt-4 py-2 text-gray-400">Public Task</p>
        <div className="flex w-full flex-col space-y-1">
          {publicTask.map(task => (
            <TaskCard id={task.id} title={task.title} key={task.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

const RightBar = ({ assessment }: { assessment: IAssessmentwithTask }) => {
  return (
    <div className="flex h-full w-full flex-col pt-4">
      <p className="mb-2 px-6 text-gray-400">Selected task for assessment</p>
      <div className="flex h-full w-full flex-col space-y-1 overflow-y-auto rounded-md bg-gray-50 p-6">
        {assessment.tasks.map(task => (
          <TaskCard
            id={task.id}
            title={task.title}
            key={`right-bar-${task.id}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function EditAssessment({
  open,
  setOpen,
  tasks,
  assessment
}: {
  open: boolean
  setOpen: (_: boolean) => void
  tasks: Task[]
  assessment: IAssessmentwithTask
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-7xl">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-8 sm:pr-2">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full w-full flex-col bg-white">
                    <div className="flex h-full overflow-y-scroll px-3 text-sm text-gray-500">
                      <LeftBar />
                      <MiddleBar tasks={tasks} />
                      <RightBar assessment={assessment} />
                    </div>
                    <div className="flex justify-end space-x-2 border-t-[1px] px-4 py-2">
                      <button
                        className="rounded-md border border-gray-100 py-2 px-9 text-gray-400 transition hover:bg-gray-100"
                        onClick={() => setOpen(false)}
                      >
                        ยกเลิก
                      </button>
                      <button
                        className="rounded-md border bg-blue-500 py-2 px-9 text-white transition hover:bg-blue-600"
                        onClick={() => setOpen(false)}
                      >
                        สร้าง
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

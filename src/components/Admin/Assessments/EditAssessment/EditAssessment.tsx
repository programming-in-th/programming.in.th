import { Fragment, useEffect, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Task } from '@prisma/client'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import useSWR, { mutate } from 'swr'

import fetcher from '@/lib/fetcher'
import { IAssessmentTask, IAssessmentwithTask } from '@/types/assessments'

import { LeftBar } from './LeftBar'
import { MiddleBar } from './MiddleBar'
import { RightBar } from './RightBar'

export type IAssessment = IAssessmentwithTask & {
  users: { userId: string }[]
  owners: { userId: string }[]
}

export interface IAssessmentForm {
  id: string
  name: string
  description: string
  instruction: string
  open: string
  close: string
}

const SubmitForm = ({
  assessment,
  tasks,
  setOpen
}: {
  assessment: IAssessment | undefined
  tasks: Task[]
  setOpen: (_: boolean) => void
}) => {
  const [selectedTasks, setSelectedTasks] = useState<
    Omit<IAssessmentTask, 'fullScore'>[]
  >([])

  const onSubmit = async (data: IAssessmentForm) => {
    const submit_data = {
      ...data,
      archived: false,
      users: [],
      owners: [],
      tasks: selectedTasks.map(task => task.id)
    }
    await toast.promise(
      fetch('/api/assessments', {
        method: assessment ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submit_data)
      }),
      {
        loading: 'Loading',
        success: 'Successfully Created a Task',
        error: 'Error'
      }
    )
    mutate('/api/assessments')
    setOpen(false)
  }

  const toggleTask = (id: string, title: string) => {
    const index = selectedTasks.map(task => task.id).indexOf(id)
    if (index === -1) setSelectedTasks(tasks => [...tasks, { id, title }])
    else setSelectedTasks(tasks => tasks.filter((_task, idx) => idx !== index))
  }

  useEffect(() => {
    setSelectedTasks(assessment?.tasks || [])
  }, [assessment])

  console.log('->', assessment)

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: assessment?.id || '',
      name: assessment?.name || '',
      description: assessment?.description || '',
      instruction: assessment?.instruction || '',
      open: assessment?.open.slice(0, -1) || '',
      close: assessment?.close.slice(0, -1) || ''
    }
  })

  return (
    <form
      className="flex h-full w-full flex-col bg-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex h-full overflow-y-scroll px-3 text-sm text-gray-500">
        <LeftBar register={register} assessment={assessment} />
        <MiddleBar
          tasks={tasks}
          selectedTasks={selectedTasks}
          toggleTask={toggleTask}
        />
        <RightBar
          tasks={selectedTasks}
          toggleTask={toggleTask}
          setTasks={setSelectedTasks}
        />
      </div>
      <div className="flex justify-end space-x-2 border-t-[1px] px-4 py-2">
        <button
          type="button"
          className="rounded-md border border-gray-100 py-2 px-9 text-gray-400 transition hover:bg-gray-100"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
        <input
          type="submit"
          value={assessment ? 'Update' : 'Create'}
          className="rounded-md border bg-blue-500 py-2 px-9 text-white transition hover:bg-blue-600"
        />
      </div>
    </form>
  )
}

export default function EditAssessment({
  open,
  setOpen,
  tasks,
  assessmentId
}: {
  open: boolean
  setOpen: (_: boolean) => void
  tasks: Task[]
  assessmentId?: string
}) {
  const { data: assessment } = useSWR<IAssessment>(
    assessmentId && `/api/assessments/${assessmentId}`,
    fetcher
  )

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
                  <SubmitForm
                    assessment={assessment}
                    tasks={tasks}
                    setOpen={setOpen}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

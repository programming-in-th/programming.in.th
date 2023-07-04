import { Fragment, useEffect, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Task } from '@prisma/client'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import useSWR, { mutate } from 'swr'

import fetcher from '@/lib/fetcher'
import { IAssessmentTask } from '@/types/assessments'
import { IUser } from '@/types/users'

import { LeftBar } from './LeftBar'
import { MiddleBar } from './MiddleBar'
import { RightBar } from './RightBar'
import { IAdminAssessment, IAssessmentForm } from './types'

const SubmitForm = ({
  assessment,
  tasks,
  setOpen,
  users
}: {
  assessment: IAdminAssessment | undefined
  tasks: Task[]
  setOpen: (_: boolean) => void
  users: IUser[]
}) => {
  const [selectedTasks, setSelectedTasks] = useState<
    Omit<IAssessmentTask, 'fullScore'>[]
  >([])

  const onSubmit = async (data: IAssessmentForm) => {
    const submit_data = {
      ...Object.entries(data).reduce((pre, [key, value]) => {
        if (key.startsWith('assign-') || key.startsWith('assignOwn-'))
          return pre
        return { ...pre, [key]: value }
      }, {}),
      archived: false,
      users: Object.entries(data).reduce(
        (pre: string[], [key, value]: [string, boolean]) => {
          if (key.startsWith('assign-'))
            if (value) return [...pre, key.slice('assign-'.length)]
          return pre
        },
        []
      ),
      owners: Object.entries(data).reduce(
        (pre: string[], [key, value]: [string, boolean]) => {
          if (key.startsWith('assignOwn-'))
            if (value) return [...pre, key.slice('assignOwn-'.length)]
          return pre
        },
        []
      ),
      tasks: selectedTasks.map(task => task.id)
    }

    try {
      await toast.promise(
        fetch(assessment ? `/api/assessments/${data.id}` : '/api/assessments', {
          method: assessment ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submit_data)
        }).then(response => {
          if (response.ok) {
            return response.json()
          }
          throw new Error(`${response.status} ${response.statusText}`)
        }),
        {
          loading: 'Loading',
          success: `Successfully ${assessment ? 'Updated' : 'Created'} a Task`,
          error: (err: Error) => `${err}`
        }
      )

      mutate('/api/assessments')
      mutate(`/api/assessments/${assessment?.id}`)

      setOpen(false)
    } catch {
      // do nothing
    }
  }

  const toggleTask = (id: string, title: string) => {
    const index = selectedTasks.map(task => task.id).indexOf(id)
    if (index === -1) setSelectedTasks(tasks => [...tasks, { id, title }])
    else setSelectedTasks(tasks => tasks.filter((_task, idx) => idx !== index))
  }

  useEffect(() => {
    setSelectedTasks(assessment?.tasks || [])
  }, [assessment])

  const { register, handleSubmit } = useForm<IAssessmentForm>({
    defaultValues: {
      id: assessment?.id || '',
      name: assessment?.name || '',
      description: assessment?.description || '',
      instruction:
        typeof assessment?.instruction === 'string'
          ? assessment.instruction
          : '' || '',
      open: assessment?.open.slice(0, -1) || '',
      close: assessment?.close.slice(0, -1) || '',
      ...users.reduce(
        (pre, user) => ({
          ...pre,
          [`assign-${user.id}`]:
            assessment?.users.map(user => user.userId).includes(user.id) ||
            false
        }),
        {}
      ),
      ...users.reduce(
        (pre, user) => ({
          ...pre,
          [`assignOwn-${user.id}`]:
            assessment?.owners.map(user => user.userId).includes(user.id) ||
            false
        }),
        {}
      )
    }
  })

  return (
    <form
      className="flex h-full w-full flex-col bg-white dark:bg-gray-800"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex h-full overflow-y-scroll px-3 text-sm text-gray-500 dark:text-gray-200">
        <LeftBar register={register} assessment={assessment} users={users} />
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
      <div className="flex justify-end space-x-2 border-t-[1px] px-4 py-2 dark:border-t-slate-700">
        <button
          type="button"
          className="rounded-md border border-gray-100 px-9 py-2 text-gray-400 transition hover:bg-gray-100 dark:border-slate-700 dark:text-gray-200 dark:hover:bg-slate-700"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
        <input
          type="submit"
          value={assessment ? 'Update' : 'Create'}
          className="cursor-pointer rounded-md border bg-blue-500 px-9 py-2 text-white transition hover:bg-blue-600 dark:border-slate-700"
        />
      </div>
    </form>
  )
}

export default function EditAssessment({
  open,
  setOpen,
  tasks,
  assessmentId,
  users
}: {
  open: boolean
  setOpen: (_: boolean) => void
  tasks: Task[]
  assessmentId?: string
  users: IUser[]
}) {
  const { data: assessment } = useSWR<IAdminAssessment>(
    assessmentId && `/api/assessments/${assessmentId}?mdType=RAW`,
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-slate-700 dark:bg-opacity-75" />
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
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-8 sm:pr-2">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white dark:text-white dark:hover:text-gray-200"
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
                    users={users}
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

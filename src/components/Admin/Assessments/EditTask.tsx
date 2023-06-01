import { Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Task } from '@prisma/client'
import clsx from 'clsx'
import { useForm, UseFormRegister } from 'react-hook-form'
import toast from 'react-hot-toast'
import { mutate } from 'swr'

export interface IAssessmentForm {
  id: string
  title: string
  fullScore: number
  private: boolean
  type: 'NORMAL' | 'COMMUNICATION' | 'OUTPUT_ONLY'
  statement: string
  categoryId: string
  tags: string[]
}

const LeftBar = ({
  task,
  register
}: {
  task: Task | undefined
  register: UseFormRegister<IAssessmentForm>
}) => {
  return (
    <div className="flex w-72 flex-none flex-col space-y-4 text-sm dark:text-gray-200">
      <div className="flex flex-col">
        <p>Task Name</p>
        <input
          type="text"
          className="h-10 rounded-md border px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline"
          {...register('title')}
        />
      </div>
      <div className="flex flex-col">
        <p>ID</p>
        <input
          type="text"
          className={clsx(
            'h-10 rounded-md border px-4 py-1 backdrop-blur-sm dark:border-gray-900 dark:bg-gray-900 dark:focus:outline',
            task && 'cursor-not-allowed text-gray-500'
          )}
          {...register('id', { required: true })}
          disabled={task !== undefined}
        />
      </div>
      <div className="flex flex-col">
        <p>Category Path</p>
        <input
          type="text"
          className="h-10 rounded-md border px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline"
          {...register('categoryId')}
        />
      </div>
      <div className="flex w-full space-x-4">
        <div className="flex w-full min-w-0 flex-col">
          <p>Full Score</p>
          <input
            type="number"
            className="h-10 w-full rounded-md border px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline"
            {...register('fullScore')}
          />
        </div>
        <div className="flex w-full min-w-0 flex-col">
          <p>Privacy</p>
          <select
            {...register('private')}
            className="h-10 w-full rounded-md border px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline"
          >
            <option value="true">private</option>
            <option value="false">public</option>
          </select>
        </div>
      </div>
      <div className="flex w-full min-w-0 flex-col">
        <p>Type</p>
        <select
          {...register('type')}
          className="h-10 w-full rounded-md border px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline"
        >
          <option value="NORMAL">Normal</option>
          <option value="COMMUNICATION">Communication</option>
          <option value="OUTPUT_ONLY">Output Only</option>
        </select>
      </div>
    </div>
  )
}

const SubmitForm = ({
  task,
  setOpen
}: {
  task: Task | undefined
  setOpen: (_: boolean) => void
}) => {
  const { register, handleSubmit } = useForm<IAssessmentForm>({
    defaultValues: {
      id: task?.id || '',
      title: task?.title || '',
      fullScore: task?.fullScore || 100,
      private: task?.private || false,
      type: task?.type || 'NORMAL',
      statement: task?.statement || 'PDF',
      categoryId: task?.categoryId || '',
      tags: []
    }
  })

  const onSubmit = async (data: IAssessmentForm) => {
    try {
      await toast.promise(
        fetch(task ? `/api/tasks/${task.id}` : '/api/tasks', {
          method: task ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(res => {
          if (!res.ok) throw new Error('Failed to submit')
          return res.json()
        }),
        {
          loading: 'Submitting...',
          success: `Successfully ${task ? 'updated' : 'created'} a task`,
          error: (err: Error) => `${err}`
        }
      )

      mutate('/api/tasks')
      mutate(`/api/tasks/${task?.id}`)

      setOpen(false)
    } catch {}
  }

  return (
    <form
      className="flex h-full w-full flex-col bg-white px-8 py-4 text-gray-500 dark:bg-gray-800"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex h-full w-full space-x-9">
        <LeftBar task={task} register={register} />
        <div className="flex w-full flex-col dark:text-gray-200">
          <p>File</p>
          <div className="flex h-full flex-col items-center justify-center rounded-md border border-dashed border-gray-400">
            <svg
              width="49"
              height="49"
              viewBox="0 0 49 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.4992 7.70005C9.84825 7.70005 7.69922 9.84908 7.69922 12.5V36.5001C7.69922 39.151 9.84825 41.3001 12.4992 41.3001H36.4992C39.1502 41.3001 41.2992 39.151 41.2992 36.5001V12.5C41.2992 9.84908 39.1502 7.70005 36.4992 7.70005H34.0992C32.7737 7.70005 31.6992 8.77457 31.6992 10.1C31.6992 11.4255 32.7737 12.5 34.0992 12.5H36.4992V29.3H31.6992L29.2992 34.1H19.6992L17.2992 29.3H12.4992V12.5L14.8992 12.5C16.2247 12.5 17.2992 11.4255 17.2992 10.1C17.2992 8.77457 16.2247 7.70005 14.8992 7.70005H12.4992Z"
                fill="#94A3B8"
              />
              <path
                d="M18.0022 18.003C18.9394 17.0657 20.459 17.0657 21.3963 18.003L22.0992 18.7059L22.0992 7.70005C22.0992 6.37457 23.1737 5.30005 24.4992 5.30005C25.8247 5.30005 26.8992 6.37456 26.8992 7.70005V18.7059L27.6022 18.003C28.5394 17.0657 30.059 17.0657 30.9963 18.003C31.9335 18.9403 31.9335 20.4598 30.9963 21.3971L26.1963 26.1971C25.7462 26.6472 25.1357 26.9 24.4992 26.9C23.8627 26.9 23.2523 26.6472 22.8022 26.1971L18.0022 21.3971C17.0649 20.4598 17.0649 18.9402 18.0022 18.003Z"
                fill="#94A3B8"
              />
            </svg>
            <p>Upload a file or drag and drop</p>
            <p className="text-sm">.PDF up to 10MB</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-2 py-2">
        <button
          type="button"
          className="rounded-md border border-gray-100 px-9 py-2 text-gray-400 transition hover:bg-gray-100 dark:border-slate-700 dark:text-gray-200 dark:hover:bg-slate-700"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
        <input
          type="submit"
          value={task ? 'Update' : 'Create'}
          className="cursor-pointer rounded-md border bg-blue-500 px-9 py-2 text-white transition hover:bg-blue-600 dark:border-slate-600"
        />
      </div>
    </form>
  )
}

export default function EditTask({
  open,
  setOpen,
  task
}: {
  open: boolean
  setOpen: (_: boolean) => void
  task?: Task
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
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-4xl">
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
                        className="rounded-md text-gray-300 hover:text-white dark:text-white dark:hover:text-gray-300"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <SubmitForm task={task} setOpen={setOpen} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

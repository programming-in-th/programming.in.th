import { Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Task } from '@prisma/client'
import { useForm } from 'react-hook-form'

export interface IAssessmentForm {
  id: string
  title: string
  fullScore: number
  private: boolean
  type: string
  close: string
}

const LeftBar = ({ task }: { task: Task | undefined }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: task?.id || '',
      title: task?.title || '',
      fullScore: task?.fullScore || 100,
      private: task?.private || false,
      type: task?.type || 'normal'
    }
  })

  return (
    <div className="flex w-72 flex-none flex-col space-y-4 text-sm">
      <div className="flex flex-col">
        <p>Task Name</p>
        <input
          type="text"
          className="h-10 rounded-md border px-4 py-1"
          {...register('title')}
        />
      </div>
      <div className="flex flex-col">
        <p>ID</p>
        <input
          type="text"
          className="h-10  rounded-md border px-4 py-1"
          {...register('id')}
          disabled={task !== undefined}
        />
      </div>
      <div className="flex w-full space-x-4">
        <div className="flex w-full min-w-0 flex-col">
          <p>Full Score</p>
          <input
            type="number"
            className="h-10 w-full rounded-md border px-4 py-1"
            {...register('fullScore')}
          />
        </div>
        <div className="flex w-full min-w-0 flex-col">
          <p>Privacy</p>
          <select
            {...register('private')}
            className="h-10 w-full rounded-md border px-4 py-1"
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
          className="h-10 w-full rounded-md border px-4 py-1"
        >
          <option value="normal">Normal</option>
          <option value="communication">Communication</option>
          <option value="output-only">Output Only</option>
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
  return (
    <form className="flex h-full w-full space-x-9 bg-white p-8 text-gray-500">
      <LeftBar task={task} />
      <div className="flex w-full flex-col">
        <p>File</p>
        <div className="flex h-96 flex-col items-center justify-center rounded-md border border-dashed border-gray-400">
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
        <div className="flex justify-end space-x-2 py-2">
          <button
            type="button"
            className="rounded-md border border-gray-100 py-2 px-9 text-gray-400 transition hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <input
            type="submit"
            value={task ? 'Update' : 'Create'}
            className="rounded-md border bg-blue-500 py-2 px-9 text-white transition hover:bg-blue-600"
          />
        </div>
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

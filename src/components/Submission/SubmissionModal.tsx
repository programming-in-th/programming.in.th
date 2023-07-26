import { Fragment, useRef } from 'react'

import Link from 'next/link'

import { Dialog, Transition } from '@headlessui/react'
import { Task } from '@prisma/client'
import clsx from 'clsx'
import dayjs from 'dayjs'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { IGeneralSubmission, IListSubmission } from '@/types/submissions'
import { getDisplayNameFromGrader } from '@/utils/language'

import SubmissionGroup from './Group'
import Code from '../Code'

const getColumn = (): {
  title: string
  field: string
  width: string
  child: (sub: IGeneralSubmission | IListSubmission, task: Task) => JSX.Element
}[] => [
  {
    title: 'Time',
    field: 'submittedAt',
    width: 'w-[10rem]',
    child: sub => {
      const dt = new Date(sub.submittedAt)
      return (
        <div className="flex flex-col text-sm">
          <p className="font-medium text-gray-500 dark:text-white">
            {dayjs(dt).format('DD MMM YYYY')}
          </p>
          <p className="text-gray-400 dark:text-gray-300">
            {dayjs(dt).format('HH:mm:ss')}
          </p>
        </div>
      )
    }
  },
  {
    title: 'Name',
    field: 'userId',
    width: 'w-[18em]',
    child: sub => (
      <p className="text-md truncate text-center font-medium text-gray-500 dark:text-white">
        {sub.user?.name}
      </p>
    )
  },
  {
    title: 'Score',
    field: 'score',
    width: 'w-[10rem]',
    child: (sub, task) => (
      <div className="flex h-auto w-full items-center justify-center text-sm">
        <div className="flex h-auto w-full flex-col items-center justify-around">
          <div className="relative h-full w-full">
            <div className="absolute h-1.5 w-full rounded-full bg-gray-100" />
            <div
              className={`absolute h-1.5 rounded-full ${
                sub.score === task.fullScore ? 'bg-blue-500' : 'bg-gray-500'
              }`}
              style={{
                width: `${(sub.score / task.fullScore) * 100}%`
              }}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-200">
            {sub.score} points
          </p>
        </div>
      </div>
    )
  },
  {
    title: 'Language',
    field: 'language',
    width: 'w-[7rem]',
    child: sub => (
      <p className="text-center text-sm font-medium text-gray-500 dark:text-white">
        {getDisplayNameFromGrader(sub.language)}
      </p>
    )
  },
  {
    title: 'Time',
    field: 'time',
    width: 'w-[7rem]',
    child: sub => (
      <p className="text-center text-sm font-medium text-gray-500 dark:text-white">
        {sub.time}{' '}
        <span className="font-light text-gray-400 dark:text-gray-300">ms</span>
      </p>
    )
  },
  {
    title: 'Memory',
    field: 'memory',
    width: 'w-[7rem]',
    child: sub => (
      <p className="text-center text-sm font-medium text-gray-500 dark:text-white">
        {sub.memory}{' '}
        <span className="font-light text-gray-400 dark:text-gray-300">kB</span>
      </p>
    )
  }
]

const useSubmission = (id: number, enabled: boolean) => {
  const { data, error } = useSWR<IGeneralSubmission>(
    enabled && `/api/submissions/${id}`,
    fetcher
  )
  return {
    submission: data,
    isLoading: !error && !data,
    isError: error
  }
}

export const SubmissionModal = ({
  open,
  setOpen,
  id,
  task
}: {
  open: boolean
  setOpen: (_open: boolean) => void
  id: number
  task: Task
}) => {
  const closeButtonRef = useRef(null)

  const { submission, isLoading } = useSubmission(id, open)

  if (isLoading || !submission) {
    return <></>
  }

  const columns = getColumn()

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={closeButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-200 text-left shadow-xl transition-all dark:bg-slate-700 sm:my-8">
                <div className="flex w-full flex-col bg-white px-6 py-3 font-display transition hover:shadow-lg dark:bg-slate-600 md:flex-row md:px-0">
                  {columns.map(column => (
                    <div
                      key={column.field}
                      className={clsx(
                        'hidden min-w-0 items-center justify-center px-2 text-sm md:flex',
                        column.width
                      )}
                    >
                      {column.child(submission, task)}
                    </div>
                  ))}
                  <div className="ml-auto mr-4 flex flex-row-reverse gap-2">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      ref={closeButtonRef}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-500 dark:text-white"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                    <Link
                      href={`/submissions/${id}`}
                      className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 p-2 dark:bg-slate-700"
                    >
                      <div className="w-full text-right text-xs text-gray-500 dark:text-white">
                        <p className="flex flex-row justify-end font-bold">
                          open
                        </p>
                        <p className="flex flex-row justify-end">in new tab</p>
                      </div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-500 dark:text-white"
                      >
                        <path
                          d="M11 3C10.4477 3 10 3.44772 10 4C10 4.55228 10.4477 5 11 5H13.5858L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L15 6.41421V9C15 9.55228 15.4477 10 16 10C16.5523 10 17 9.55228 17 9V4C17 3.44772 16.5523 3 16 3H11Z"
                          fill="currentColor"
                        />
                        <path
                          d="M5 5C3.89543 5 3 5.89543 3 7V15C3 16.1046 3.89543 17 5 17H13C14.1046 17 15 16.1046 15 15V12C15 11.4477 14.5523 11 14 11C13.4477 11 13 11.4477 13 12V15H5V7L8 7C8.55228 7 9 6.55228 9 6C9 5.44772 8.55228 5 8 5H5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="bg-white px-4 pb-4 pt-5 dark:bg-slate-700 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 flex w-full flex-row text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <div className="w-1/2">
                        {submission && (
                          <SubmissionGroup groups={submission.groups} />
                        )}
                      </div>
                      <div className="w-1/2">
                        <Code
                          code={submission.code[0]}
                          language={submission.language}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

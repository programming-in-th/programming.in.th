import { Fragment, useRef } from 'react'

import Link from 'next/link'

import { Dialog, Transition } from '@headlessui/react'
import { Task } from '@prisma/client'
import clsx from 'clsx'
import dayjs from 'dayjs'

import { useSSESubmissionData } from '@/lib/useSubmissionData'
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

  const { submission, isLoading } = useSSESubmissionData(id)

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-slate-700 sm:my-8">
                <div className="flex w-full flex-col bg-gray-100 px-6 py-3 font-display transition hover:shadow-lg dark:bg-slate-600 md:flex-row md:px-0">
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
                      className="rounded-lg bg-red-400 p-2 text-gray-50 dark:bg-red-600"
                    >
                      Close
                    </button>
                    <Link
                      href={`/submissions/${id}`}
                      className="rounded-lg bg-gray-50 p-2 dark:bg-slate-700"
                    >
                      <p className="text-md">Open in new tab</p>
                    </Link>
                  </div>
                </div>
                <div className="bg-white px-4 pb-4 pt-5 dark:bg-slate-700 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 flex flex-row text-center sm:ml-4 sm:mt-0 sm:text-left">
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

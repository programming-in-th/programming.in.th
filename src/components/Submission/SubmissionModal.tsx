import { Fragment, useRef } from 'react'

import Link from 'next/link'

import { Dialog, Transition } from '@headlessui/react'
import { Task } from '@prisma/client'
import clsx from 'clsx'

import { useSSESubmissionData } from '@/lib/useSubmissionData'
import { IListSubmission } from '@/types/submissions'

import SubmissionGroup from './Group'
import Code from '../Code'

interface IColumn {
  title: string
  field: string
  width: string
  child: (sub: IListSubmission, task: Task) => JSX.Element
}

export const SubmissionModal = ({
  open,
  setOpen,
  id,
  task,
  columns
}: {
  open: boolean
  setOpen: (_open: boolean) => void
  id: number
  task: Task
  columns: IColumn[]
}) => {
  const closeButtonRef = useRef(null)

  const { submission, isLoading } = useSSESubmissionData(id)

  if (isLoading || !submission) {
    return <></>
  }

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
                <div className="flex w-full flex-col rounded-xl px-6 py-3 font-display shadow-md transition hover:shadow-lg dark:bg-slate-700 md:flex-row md:px-0">
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
                  <Link href={`/submissions/${id}`} className="p-2">
                    <p className="text-lg">Open in new tab</p>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    ref={closeButtonRef}
                  >
                    Exit
                  </button>
                </div>
                <div className="bg-white px-4 pb-4 pt-5 dark:bg-slate-700 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 flex flex-row text-center sm:ml-4 sm:mt-0 sm:text-left">
                      {submission && (
                        <SubmissionGroup groups={submission.groups} />
                      )}
                      <Code
                        code={submission.code[0]}
                        language={submission.language}
                      />
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

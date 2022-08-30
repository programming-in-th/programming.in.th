import { Fragment, useEffect, useRef, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import clsx from 'clsx'

const VerifyDelete = ({
  open,
  setOpen,
  id,
  onDelete,
  isTask = false
}: {
  open: boolean
  setOpen: (_open: boolean) => void
  id: string
  onDelete: () => void
  isTask?: boolean
}) => {
  const [text, setText] = useState<string>('')

  useEffect(() => setText(''), [open])

  const cancelButtonRef = useRef(null)
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-slate-700 sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 dark:bg-slate-700 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                      >
                        Delete {isTask ? 'Task' : 'Assessment'}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-gray-200">
                          Are you sure you want to delete your{' '}
                          {isTask ? 'task' : 'assessment'}? All of your data
                          will be permanently removed. This action cannot be
                          undone. Please type{' '}
                          <span className="font-bold text-black dark:text-white">
                            {id}
                          </span>{' '}
                          to confirm.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 dark:bg-slate-600 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className={clsx(
                      'inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium shadow-sm transition focus:outline-none sm:ml-3 sm:w-auto sm:text-sm',
                      text === id
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'cursor-not-allowed bg-red-800 text-gray-300'
                    )}
                    onClick={() => {
                      setOpen(false)
                      onDelete()
                    }}
                    disabled={text !== id}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none dark:border-0 dark:bg-slate-500 dark:text-gray-100 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <input
                    type="text"
                    className="rounded-md border border-gray-300 bg-white px-2 dark:border-0 dark:bg-slate-700 dark:text-gray-100"
                    onChange={e => setText(e.target.value)}
                  ></input>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default VerifyDelete

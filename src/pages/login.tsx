import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { signIn } from 'next-auth/react'

import { PageLayout } from '@/components/Layout'
import { AuthGitHubLogo, AuthGoogleLogo } from '@/vectors/Socials'

const ErrorComp = ({ open, setOpen, errMsg }) => (
  <Transition.Root show={open} as={Fragment}>
    <Dialog
      as="div"
      auto-reopen="true"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={setOpen}
    >
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-prog-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Error
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{errMsg}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-sm"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition.Root>
)

const Login = () => {
  const [errMsg, setErrMsg] = useState<string>(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent accumsan, velit quis cursus molestie, lorem neque accumsan ipsum, at fringilla quam eros a nisl. Etiam nec interdum augue. Suspendisse ipsum elit, condimentum vel rutrum quis, elementum scelerisque diam. Suspendisse lorem augue, condimentum a iaculis ut, finibus et leo. Vestibulum aliquet sed lacus eu interdum. Nunc eu molestie dolor. Ut nibh mi, lobortis vitae scelerisque sit amet, pellentesque et magna. '
  )
  const [open, setOpen] = useState<boolean>(false)

  const setError = (msg: string) => {
    setErrMsg(msg)
    setOpen(true)
  }

  return (
    <PageLayout>
      <ErrorComp open={open} setOpen={setOpen} errMsg={errMsg} />
      <div className="flex min-h-screen flex-col justify-center pb-44 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2
            className="mt-6 px-4 text-center text-3xl font-extrabold text-prog-gray-500"
            onClick={() => setError(errMsg)}
          >
            Login
          </h2>
        </div>
        <div className="mt-2 px-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-2 sm:rounded-lg sm:px-10">
            <div className="mt-6">
              <div className="mt-6 flex flex-col gap-6">
                <div>
                  <button
                    className="inline-flex gap-3 w-full justify-center rounded-md bg-white px-4 py-4 text-sm font-medium text-gray-500 shadow-md hover:bg-gray-50"
                    onClick={() => signIn('google')}
                  >
                    <AuthGoogleLogo className="h-5 w-5" />
                    <span>Sign in with Google</span>
                  </button>
                </div>

                <div>
                  <button
                    className="inline-flex gap-3 w-full justify-center rounded-md bg-white px-4 py-4 text-sm font-medium text-gray-500 shadow-md hover:bg-gray-50"
                    onClick={() => signIn('github')}
                  >
                    <AuthGitHubLogo className="h-5 w-5" />
                    <span>Sign in with GitHub</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default Login

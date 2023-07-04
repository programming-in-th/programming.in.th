import { Suspense } from 'react'

import { ErrorMessage } from './ErrorMessage'
import { SignIn } from './SignIn'

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col justify-center pb-44 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 px-4 text-center text-3xl font-extrabold text-prog-gray-500 dark:text-prog-gray-100">
          Continue to PROGRAMMING.IN.TH
        </h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Suspense>
          <ErrorMessage />
        </Suspense>
      </div>
      <div className="mt-2 px-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-2 dark:bg-slate-800 sm:rounded-lg sm:px-10">
          <div className="mt-12 flex flex-col gap-6">
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  )
}

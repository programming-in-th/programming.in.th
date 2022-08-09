import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { signIn } from 'next-auth/react'

import { PageLayout } from '@/components/Layout'
import { AuthGitHubLogo, AuthGoogleLogo } from '@/svg/Socials'

const Login = () => {
  const { query } = useRouter()
  const { error } = query

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error
    errorMessage && alert(errorMessage)
  }, [error])

  return (
    <PageLayout>
      <div className="flex min-h-screen flex-col justify-center pb-44 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 px-4 text-center text-3xl font-extrabold text-prog-gray-500 dark:text-prog-gray-100">
            Log in to PROGRAMMING.IN.TH
          </h2>
        </div>
        <div className="mt-2 px-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-2 dark:bg-slate-800 sm:rounded-lg sm:px-10">
            <div className="mt-6">
              <div className="mt-6 flex flex-col gap-6">
                <div>
                  <button
                    className="inline-flex w-full justify-center gap-3 rounded-md bg-white px-4 py-4 text-sm font-medium text-gray-500 shadow-md transition hover:bg-gray-50 dark:bg-slate-600 dark:text-gray-200 dark:hover:bg-slate-700"
                    onClick={() => signIn('google')}
                  >
                    <AuthGoogleLogo className="h-5 w-5" />
                    <span>Sign in with Google</span>
                  </button>
                </div>

                <div>
                  <button
                    className="inline-flex w-full justify-center gap-3 rounded-md bg-white px-4 py-4 text-sm font-medium text-gray-500 shadow-md transition hover:bg-gray-50 dark:bg-slate-600 dark:text-gray-200 dark:hover:bg-slate-700"
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

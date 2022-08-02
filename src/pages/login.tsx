import React from 'react'
import { signIn } from 'next-auth/react'

import { PageLayout } from '@/components/Layout'
import { AuthGitHubLogo, AuthGoogleLogo } from '@/svg/Socials'

const Login = () => {
  return (
    <PageLayout>
      <div className="flex flex-col justify-center min-h-screen pb-44 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="px-4 mt-6 text-3xl font-extrabold text-center text-prog-gray-500">
            Log in to PROGRAMMING.IN.TH
          </h2>
        </div>
        <div className="px-4 mt-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-2 bg-white sm:rounded-lg sm:px-10">
            <div className="mt-6">
              <div className="flex flex-col gap-6 mt-6">
                <div>
                  <button
                    className="inline-flex justify-center w-full gap-3 px-4 py-4 text-sm font-medium text-gray-500 bg-white rounded-md shadow-md hover:bg-gray-50"
                    onClick={() => signIn('google')}
                  >
                    <AuthGoogleLogo className="w-5 h-5" />
                    <span>Sign in with Google</span>
                  </button>
                </div>

                <div>
                  <button
                    className="inline-flex justify-center w-full gap-3 px-4 py-4 text-sm font-medium text-gray-500 bg-white rounded-md shadow-md hover:bg-gray-50"
                    onClick={() => signIn('github')}
                  >
                    <AuthGitHubLogo className="w-5 h-5" />
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

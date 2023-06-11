'use client'

import { type NextPage } from 'next'

import { useSearchParams } from 'next/navigation'

import { SignInErrorTypes } from 'next-auth/core/pages/signin'
import { signIn } from 'next-auth/react'

import { AuthGitHubLogo, AuthGoogleLogo } from '@/svg/Socials'

// Direct copy from https://github.com/nextauthjs/next-auth/blob/main/packages/next-auth/src/core/pages/signin.tsx
const errors: Record<SignInErrorTypes, string> = {
  Signin: 'Try signing in with a different account.',
  OAuthSignin: 'Try signing in with a different account.',
  OAuthCallback: 'Try signing in with a different account.',
  OAuthCreateAccount: 'Try signing in with a different account.',
  EmailCreateAccount: 'Try signing in with a different account.',
  Callback: 'Try signing in with a different account.',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'The e-mail could not be sent.',
  CredentialsSignin:
    'Sign in failed. Check the details you provided are correct.',
  SessionRequired: 'Please sign in to access this page.',
  default: 'Unable to sign in.'
}

const Login: NextPage = () => {
  const searchParams = useSearchParams()
  const errType = searchParams!.get('error')

  const error = (
    Array.isArray(errType) ? errType.pop() : errType
  ) as SignInErrorTypes

  const errorMessage = error && (errors[error] ?? errors.default)

  return (
    <div className="flex min-h-screen flex-col justify-center pb-44 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 px-4 text-center text-3xl font-extrabold text-prog-gray-500 dark:text-prog-gray-100">
          Continue to PROGRAMMING.IN.TH
        </h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {errorMessage && <p>{errorMessage}</p>}
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
  )
}

export default Login

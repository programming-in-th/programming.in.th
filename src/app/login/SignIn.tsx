'use client'

import { signIn } from 'next-auth/react'

import { AuthGitHubLogo, AuthGoogleLogo } from '@/svg/Socials'

export const SignIn = () => {
  return (
    <>
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
    </>
  )
}

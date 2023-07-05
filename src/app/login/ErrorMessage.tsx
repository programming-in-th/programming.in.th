'use client'

import { useSearchParams } from 'next/navigation'

import { SignInErrorTypes } from 'next-auth/core/pages/signin'

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

export const ErrorMessage = () => {
  const searchParams = useSearchParams()
  const errType = searchParams.get('error')

  const error = (
    Array.isArray(errType) ? errType.pop() : errType
  ) as SignInErrorTypes

  const errorMessage = error && (errors[error] ?? errors.default)

  return (
    <>
      {errorMessage && (
        <p className="text-center">
          {errorMessage} <br />
          (Code: {error})
        </p>
      )}
    </>
  )
}

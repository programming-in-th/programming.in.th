'use client'

import { signIn } from 'next-auth/react'

import { AuthGoogleLogo } from '@/svg/Socials'

import { LoginProps, getProps } from './props'
import styles from './style.module.css'

export const LoginGoogle = ({ type }: LoginProps) => {
  const { message, disabled } = getProps('Google', type)

  return (
    <button
      className={styles.loginButton}
      onClick={() => signIn('google')}
      disabled={disabled}
    >
      <AuthGoogleLogo className="h-5 w-5" />
      <span>{message}</span>
    </button>
  )
}

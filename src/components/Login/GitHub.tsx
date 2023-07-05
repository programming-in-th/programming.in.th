'use client'

import { signIn } from 'next-auth/react'

import { AuthGitHubLogo } from '@/svg/Socials'

import { LoginProps, getProps } from './props'
import styles from './style.module.css'

export const LoginGitHub = ({ type }: LoginProps) => {
  const { message, disabled } = getProps('GitHub', type)

  return (
    <button
      className={styles.loginButton}
      onClick={() => signIn('github')}
      disabled={disabled}
    >
      <AuthGitHubLogo className="h-5 w-5" />
      <span>{message}</span>
    </button>
  )
}

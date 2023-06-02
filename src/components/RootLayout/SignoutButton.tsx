'use client'

import { FC } from 'react'

import { signOut } from 'next-auth/react'

export const SignoutButton: FC<{ className: string }> = ({ className }) => {
  return (
    <button onClick={() => signOut()} className={className}>
      Logout
    </button>
  )
}

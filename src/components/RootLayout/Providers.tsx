'use client'

import { ReactNode } from 'react'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'

/**
 * Providers for client components
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Toaster
        toastOptions={{ className: 'dark:bg-slate-600 dark:text-gray-100' }}
      />
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  )
}

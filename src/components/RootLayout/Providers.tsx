'use client'

import { ReactNode } from 'react'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

/**
 * Providers for client components
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  )
}

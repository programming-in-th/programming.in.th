import { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'

import '@/styles/index.css'
import '@/styles/fonts.css'
import '@/styles/style.scss'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Toaster
          toastOptions={{ className: 'dark:bg-slate-600 dark:text-gray-100' }}
        />
        <Component {...pageProps} />
        <Analytics />
      </ThemeProvider>
    </SessionProvider>
  )
}

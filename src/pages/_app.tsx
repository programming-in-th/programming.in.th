import { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

import '@/styles/index.css'
import '@/styles/fonts.css'
import '@/styles/style.scss'
import { Toaster } from 'react-hot-toast'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Toaster />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

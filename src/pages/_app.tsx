import { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

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
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

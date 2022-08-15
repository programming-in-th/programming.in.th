import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import '@/styles/index.css'
import '@/styles/fonts.css'
import '@/styles/style.scss'
import Head from 'next/head'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Head>
          <title>PROGRAMMING.IN.TH | β</title>
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

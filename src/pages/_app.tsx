import { Fragment } from 'react'
import { SessionProvider } from 'next-auth/react'
import '@/styles/index.css'
import '@/styles/fonts.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  const Layout = Component.layoutProps?.Layout || Fragment

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

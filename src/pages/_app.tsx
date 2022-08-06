import { Worker } from '@react-pdf-viewer/core'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import '@/styles/index.css'
import '@/styles/fonts.css'
import '@/styles/style.scss'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.js">
      <SessionProvider session={session}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </Worker>
  )
}

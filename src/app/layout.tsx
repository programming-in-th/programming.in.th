import React from 'react'

import { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/react'
import { Inter } from 'next/font/google'
import { User } from 'next-auth'

import '@/styles/index.css'
import '@/styles/style.scss'

import { Footer } from '@/components/Footer'
import { Nav } from '@/components/Nav'
import { getCurrentUser } from '@/lib/session'

import { Providers } from './providers'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap'
})

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = (await getCurrentUser()) as User

  return (
    <html lang="th" className={`${inter.variable}`} suppressHydrationWarning>
      <body>
        <body>
          <Providers>
            <div className="w-full overflow-hidden font-display">
              <Nav user={user} />
              {children}
              <Footer user={user} />
            </div>
          </Providers>
        </body>
        <Analytics />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  themeColor: '#000000',
  icons: {
    icon: '/assets/img/icon-512.png',
    apple: '/assets/img/icon-apple.png'
  },
  manifest: '/manifest.json',
  description:
    'PROGRAMMING.IN.TH provides you with the fundamentals of algorithmic problem-solving, an important skill to differentiate yourself as a programmer in an increasingly technologically advanced world.',
  openGraph: {
    title: 'PROGRAMMING.IN.TH',
    description:
      'PROGRAMMING.IN.TH provides you with the fundamentals of algorithmic problem-solving, an important skill to differentiate yourself as a programmer in an increasingly technologically advanced world.',
    url: 'https://beta.programming.in.th',
    siteName: 'programming.in.th',
    images: [
      {
        url: '/assets/img/og.jpg',
        width: 1200,
        height: 630,
        alt: 'programming.in.th'
      }
    ],
    locale: 'th_TH',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'programming.in.th'
  }
}

import React, { useMemo } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSession } from 'next-auth/react'

import { FacebookLogo, GitHubLogo } from '@/svg/Socials'

import ThemeSwitch from './DarkMode'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Tasks', href: '/tasks' },
  { name: 'Learn', href: '/learn' },
  { name: 'About', href: '/about' }
]

export const Footer = () => {
  const currentYear = useMemo(() => +new Date().getFullYear(), [])

  const router = useRouter()
  const location = useMemo(() => {
    return router.pathname.split('/')[1]
  }, [router])

  const { data: session } = useSession()

  return (
    <footer className="flex w-full flex-col items-center bg-white font-display dark:bg-slate-800">
      <div className="flex w-full max-w-5xl flex-col items-center">
        <div className="flex w-full max-w-md justify-between p-8 font-display">
          {navigation.map(item => (
            <Link href={item.href} key={item.name} passHref>
              <a
                key={item.name}
                className={`${
                  `/${location}` == item.href
                    ? 'text-prog-primary-500 hover:text-blue-600'
                    : 'text-prog-gray-500 hover:text-gray-600 dark:text-white dark:hover:text-slate-300'
                }`}
              >
                {item.name}
              </a>
            </Link>
          ))}
        </div>
        <div className="flex w-full justify-center border-y-[0.5px]">
          <div className="flex max-w-sm flex-col items-center py-12">
            <p className="my-2 font-bold text-gray-500 dark:text-white">
              PROGRAMMING.IN.TH
            </p>
            <p className="text-center text-sm text-gray-500 dark:text-white">
              โปรแกรมมิ่งอินทีเอช ศูนย์รวมของโจทย์และเนื้อหาสำหรับ
              การเขียนโปรแกรมเพื่อการแข่งขัน และวิทยาการคอมพิวเตอร์
            </p>
            {session ? (
              <Link passHref href="/tasks">
                <a className="trasition-colors mt-4 rounded-md bg-prog-primary-500 py-2.5 px-9 text-white hover:bg-prog-primary-600">
                  ค้นหาโจทย์
                </a>
              </Link>
            ) : (
              <Link passHref href="/login">
                <a className="trasition-colors mt-4 rounded-md bg-prog-primary-500 py-2.5 px-9 text-white hover:bg-prog-primary-600">
                  เข้าร่วม
                </a>
              </Link>
            )}
          </div>
        </div>
        <div className="flex w-full justify-between py-12 px-8 font-display">
          <div className="flex space-x-4">
            <Link href="https://www.facebook.com/programming.in.th/" passHref>
              <a target="_blank" rel="noreferrer">
                <FacebookLogo className="text-[#64748B] dark:text-white" />
              </a>
            </Link>
            <Link href="https://github.com/programming-in-th/" passHref>
              <a target="_blank" rel="noreferrer">
                <GitHubLogo className="text-[#64748B] dark:text-white" />
              </a>
            </Link>
          </div>

          <p className="w-full text-sm leading-4 text-gray-500 dark:text-white sm:w-80">
            © 2019-{currentYear} the PROGRAMMING.IN.TH team{'\n'} We are open
            source on{' '}
            <Link
              href="https://github.com/programming-in-th/programming.in.th"
              passHref
            >
              <a target="_blank" rel="noreferrer">
                GitHub
              </a>
            </Link>
          </p>
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  )
}

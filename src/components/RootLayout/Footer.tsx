import { useMemo } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { User } from 'next-auth'

import { FacebookLogo, GitHubLogo } from '@/svg/Socials'

import { FooterNavigation } from './FooterNavigation'
import { PoweredByVercel } from './PoweredByVercel'
import DarkMode from '../DarkMode'

export const Footer = ({ user }: { user: User }) => {
  const currentYear = useMemo(() => +new Date().getFullYear(), [])

  return (
    <footer className="flex w-full flex-col items-center bg-white px-10 font-display dark:bg-slate-800">
      <div className="flex w-full max-w-5xl flex-col items-center">
        <div className="flex w-full max-w-md flex-col items-center justify-between space-y-6 p-8 font-display md:flex-row md:space-y-0">
          <FooterNavigation />
        </div>
        <div className="flex w-full justify-center border-y-[0.5px]">
          <div className="flex max-w-sm flex-col items-center py-12">
            <p className="my-2 font-bold text-gray-500 dark:text-gray-100">
              PROGRAMMING.IN.TH
            </p>
            <p className="text-center text-sm text-gray-500 dark:text-gray-100">
              โปรแกรมมิ่งอินทีเอช ศูนย์รวมของโจทย์และเนื้อหาสำหรับ
              การเขียนโปรแกรมเพื่อการแข่งขัน และวิทยาการคอมพิวเตอร์
            </p>
            {user ? (
              <Link
                href="/tasks"
                className="trasition-colors mt-4 rounded-md bg-prog-primary-500 px-9 py-2.5 text-white hover:bg-prog-primary-600"
              >
                ค้นหาโจทย์
              </Link>
            ) : (
              <Link
                href="/login"
                className="trasition-colors mt-4 rounded-md bg-prog-primary-500 px-9 py-2.5 text-white hover:bg-prog-primary-600"
              >
                เข้าร่วม
              </Link>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col justify-between font-display md:flex-row md:justify-between md:py-10">
          <div className="flex flex-col items-center justify-center space-x-4 space-y-4 border-b-[0.5px] py-6 md:flex-row md:justify-start md:space-y-0 md:border-none md:py-0">
            <div className="flex space-x-2">
              <Link
                href="https://www.facebook.com/programming.in.th/"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookLogo className="text-[#64748B] dark:text-gray-100" />
              </Link>
              <Link
                href="https://github.com/programming-in-th/"
                target="_blank"
                rel="noreferrer"
              >
                <GitHubLogo className="text-[#64748B] dark:text-gray-100" />
              </Link>
            </div>
            <p className="w-full text-center text-sm leading-4 text-gray-500 dark:text-gray-100 sm:w-80 md:text-left">
              © 2019-{currentYear} the PROGRAMMING.IN.TH team{'\n'} We are open
              source on{' '}
              <Link
                href="https://github.com/programming-in-th/programming.in.th"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </Link>
            </p>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex h-full w-full items-center md:w-auto">
              <DarkMode />
            </div>
            <div className="my-4 flex items-center justify-center md:my-0">
              <PoweredByVercel />
              <div className="flex h-full items-center">
                <Image
                  src="/assets/img/IPST_Logo.png"
                  height="34"
                  width="30"
                  alt="IPST's Logo"
                  style={{
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

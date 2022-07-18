import { FacebookLogo, GitHubLogo } from '@/vectors/Socials'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export const Footer = () => {
  const currentYear = useMemo(() => +new Date().getFullYear(), [])

  const router = useRouter()
  const location = useMemo(() => {
    return router.pathname.split('/')[1]
  }, [router])

  return (
    <footer className="flex bg-white w-full flex-col items-center font-display">
      <div className="flex w-full max-w-5xl flex-col items-center">
        <div className="flex w-full max-w-md justify-between p-8 font-display">
          <p className="text-prog-primary-500">Home</p>
          <p className="text-prog-gray-500">Tasks</p>
          <p className="text-prog-gray-500">Learn</p>
          <p className="text-prog-gray-500">About</p>
        </div>
        <div className="flex w-full justify-center border-y-[0.5px]">
          <div className="flex max-w-sm flex-col items-center py-12">
            <p className="my-2 font-bold text-gray-500">PROGRAMMING.IN.TH</p>
            <p className="text-center text-sm text-gray-500">
              โปรแกรมมิ่งอินทีเอช ศูนย์รวมของโจทย์และเนื้อหาสำหรับ
              การเขียนโปรแกรมเพื่อการแข่งขัน และวิทยาการคอมพิวเตอร์
            </p>
            <button className="mt-4 rounded-md bg-blue-500 py-2.5 px-9 text-white">
              เข้าร่วม
            </button>
          </div>
        </div>
        <div className="flex justify-between p-12 font-display">
          <Link href="https://www.facebook.com/programming.in.th/" passHref>
            <a target="_blank" rel="noreferrer">
              <FacebookLogo />
            </a>
          </Link>
          <Link
            href="https://github.com/programming-in-th/programming.in.th"
            passHref
          >
            <a target="_blank" rel="noreferrer">
              <GitHubLogo />
            </a>
          </Link>
          <p className="w-full sm:w-80 text-sm leading-4 text-gray-500">
            © 2019-{currentYear} the PROGRAMMING.IN.TH team{'\n'} The source
            code for this website is available on GitHub
          </p>
        </div>
      </div>
    </footer>
  )
}

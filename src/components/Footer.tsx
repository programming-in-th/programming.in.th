import React, { useMemo } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSession } from 'next-auth/react'

import { FacebookLogo, GitHubLogo } from '@/svg/Socials'

import DarkMode from './DarkMode'

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
    <footer className="flex w-full flex-col items-center bg-white px-10 font-display dark:bg-slate-800">
      <div className="flex w-full max-w-5xl flex-col items-center">
        <div className="flex w-full max-w-md flex-col items-center justify-between space-y-6 p-8 font-display md:flex-row md:space-y-0">
          {navigation.map(item => (
            <Link
              href={item.href}
              key={item.name}
              passHref
              className={`${
                `/${location}` == item.href
                  ? 'text-prog-primary-500 hover:text-blue-600'
                  : 'text-prog-gray-500 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300'
              }`}
            >
              {item.name}
            </Link>
          ))}
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
            {session ? (
              <Link
                passHref
                href="/tasks"
                className="trasition-colors mt-4 rounded-md bg-prog-primary-500 py-2.5 px-9 text-white hover:bg-prog-primary-600"
              >
                ค้นหาโจทย์
              </Link>
            ) : (
              <Link
                passHref
                href="/login"
                className="trasition-colors mt-4 rounded-md bg-prog-primary-500 py-2.5 px-9 text-white hover:bg-prog-primary-600"
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
                passHref
                target="_blank"
                rel="noreferrer"
              >
                <FacebookLogo className="text-[#64748B] dark:text-gray-100" />
              </Link>
              <Link
                href="https://github.com/programming-in-th/"
                passHref
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
                passHref
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
              <svg
                width="166"
                height="35"
                viewBox="0 0 166 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <g clipPath="url(#clip0_3127_10521)">
                  <path
                    d="M158.965 0H6.23299C2.79006 0 -0.000976562 2.8491 -0.000976562 6.36364V28.6364C-0.000976562 32.1509 2.79006 35 6.23299 35H158.965C162.408 35 165.199 32.1509 165.199 28.6364V6.36364C165.199 2.8491 162.408 0 158.965 0Z"
                    fill="black"
                  />
                  <path
                    d="M47.0962 12.112V21.0795H48.192V17.8791H50.4019C52.0517 17.8791 53.2267 16.6921 53.2267 15.0142C53.2267 13.3052 52.076 12.112 50.4141 12.112H47.0962ZM48.192 13.1064H50.1279C51.4003 13.1064 52.1004 13.7837 52.1004 15.0142C52.1004 16.2011 51.376 16.8848 50.1279 16.8848H48.192V13.1064ZM57.1536 21.1976C59.0225 21.1976 60.1793 19.8801 60.1793 17.7299C60.1793 15.5735 59.0225 14.2622 57.1536 14.2622C55.2846 14.2622 54.1279 15.5735 54.1279 17.7299C54.1279 19.8801 55.2846 21.1976 57.1536 21.1976ZM57.1536 20.2343C55.9116 20.2343 55.2116 19.3146 55.2116 17.7299C55.2116 16.139 55.9116 15.2254 57.1536 15.2254C58.3955 15.2254 59.0956 16.139 59.0956 17.7299C59.0956 19.3146 58.3955 20.2343 57.1536 20.2343ZM69.5852 14.3803H68.532L67.2414 19.7372H67.144L65.6768 14.3803H64.6723L63.2051 19.7372H63.1077L61.8171 14.3803H60.7578L62.5964 21.0795H63.6556L65.1167 15.8966H65.2141L66.6813 21.0795H67.7467L69.5852 14.3803ZM73.1104 15.2068C74.1514 15.2068 74.8454 15.9899 74.8697 17.1768H71.2535C71.3327 15.9899 72.0632 15.2068 73.1104 15.2068ZM74.8393 19.3457C74.5653 19.936 73.9931 20.253 73.1468 20.253C72.0327 20.253 71.3084 19.414 71.2535 18.0904V18.0406H75.9716V17.6305C75.9716 15.5486 74.8941 14.2622 73.1225 14.2622C71.3205 14.2622 70.1638 15.6294 70.1638 17.7361C70.1638 19.8552 71.3022 21.1976 73.1225 21.1976C74.5592 21.1976 75.582 20.4891 75.8864 19.3457H74.8393ZM77.366 21.0795H78.4129V16.9282C78.4129 15.9837 79.1376 15.3001 80.1358 15.3001C80.3431 15.3001 80.7202 15.3373 80.806 15.3622V14.2933C80.6719 14.2746 80.4522 14.2622 80.2823 14.2622C79.4119 14.2622 78.6568 14.7221 78.462 15.3746H78.3646V14.3803H77.366V21.0795ZM84.3001 15.2068C85.3412 15.2068 86.0355 15.9899 86.0596 17.1768H82.4431C82.5226 15.9899 83.2536 15.2068 84.3001 15.2068ZM86.0292 19.3457C85.7549 19.936 85.183 20.253 84.3367 20.253C83.2224 20.253 82.4985 19.414 82.4431 18.0904V18.0406H87.1615V17.6305C87.1615 15.5486 86.0838 14.2622 84.3126 14.2622C82.5102 14.2622 81.3538 15.6294 81.3538 17.7361C81.3538 19.8552 82.4922 21.1976 84.3126 21.1976C85.7495 21.1976 86.7719 20.4891 87.0765 19.3457H86.0292ZM90.9852 21.1976C91.8923 21.1976 92.6715 20.7564 93.0853 20.0106H93.1827V21.0795H94.1809V11.7205H93.1344V15.4367H93.0424C92.6715 14.7035 91.8985 14.2622 90.9852 14.2622C89.3169 14.2622 88.2275 15.6294 88.2275 17.7299C88.2275 19.8366 89.3044 21.1976 90.9852 21.1976ZM91.2284 15.2254C92.4159 15.2254 93.1586 16.1949 93.1586 17.7299C93.1586 19.2773 92.4214 20.2343 91.2284 20.2343C90.0291 20.2343 89.3106 19.2959 89.3106 17.7299C89.3106 16.17 90.0353 15.2254 91.2284 15.2254ZM102.498 21.1976C104.16 21.1976 105.249 19.8242 105.249 17.7299C105.249 15.6232 104.165 14.2622 102.498 14.2622C101.597 14.2622 100.799 14.7159 100.44 15.4367H100.342V11.7205H99.2951V21.0795H100.294V20.0106H100.391C100.805 20.7564 101.585 21.1976 102.498 21.1976ZM102.254 15.2254C103.453 15.2254 104.165 16.1638 104.165 17.7299C104.165 19.2959 103.453 20.2343 102.254 20.2343C101.061 20.2343 100.318 19.2773 100.318 17.7299C100.318 16.1825 101.061 15.2254 102.254 15.2254ZM106.961 23.5032C108.123 23.5032 108.647 23.0433 109.206 21.4896L111.77 14.3803H110.656L108.86 19.8925H108.762L106.961 14.3803H105.828L108.257 21.0857L108.135 21.4834C107.861 22.2913 107.533 22.5834 106.93 22.5834C106.784 22.5834 106.619 22.5772 106.491 22.5524V23.4659C106.638 23.4907 106.82 23.5032 106.961 23.5032ZM120.512 21.0795L123.55 12.112H121.876L119.684 19.2089H119.581L117.371 12.112H115.636L118.705 21.0795H120.512ZM126.759 15.3684C127.666 15.3684 128.263 16.0147 128.293 17.0214H125.157C125.224 16.0271 125.858 15.3684 126.759 15.3684ZM128.305 19.2089C128.086 19.7123 127.568 19.992 126.82 19.992C125.828 19.992 125.188 19.2835 125.151 18.1525V18.0717H129.803V17.5746C129.803 15.4305 128.664 14.1441 126.765 14.1441C124.835 14.1441 123.636 15.5175 123.636 17.705C123.636 19.8925 124.817 21.2162 126.777 21.2162C128.348 21.2162 129.462 20.4456 129.736 19.2089H128.305ZM131.069 21.0795H132.579V17.152C132.579 16.2011 133.261 15.5797 134.241 15.5797C134.497 15.5797 134.898 15.6232 135.014 15.6667V14.2373C134.874 14.1939 134.606 14.169 134.387 14.169C133.529 14.169 132.81 14.6662 132.627 15.3373H132.524V14.2808H131.069V21.0795ZM141.589 16.5678C141.431 15.1384 140.396 14.1441 138.685 14.1441C136.683 14.1441 135.507 15.4554 135.507 17.6615C135.507 19.8987 136.689 21.2162 138.691 21.2162C140.378 21.2162 141.425 20.2592 141.589 18.8361H140.152C139.994 19.5445 139.471 19.9236 138.685 19.9236C137.657 19.9236 137.036 19.0909 137.036 17.6615C137.036 16.2509 137.65 15.4367 138.685 15.4367C139.514 15.4367 140.012 15.9091 140.152 16.5678H141.589ZM145.577 15.3684C146.484 15.3684 147.081 16.0147 147.111 17.0214H143.975C144.042 16.0271 144.676 15.3684 145.577 15.3684ZM147.124 19.2089C146.904 19.7123 146.386 19.992 145.638 19.992C144.646 19.992 144.007 19.2835 143.97 18.1525V18.0717H148.621V17.5746C148.621 15.4305 147.482 14.1441 145.583 14.1441C143.653 14.1441 142.454 15.5175 142.454 17.705C142.454 19.8925 143.635 21.2162 145.596 21.2162C147.166 21.2162 148.28 20.4456 148.554 19.2089H147.124ZM149.948 21.0795H151.458V11.6521H149.948V21.0795Z"
                    fill="white"
                  />
                  <path
                    d="M18.1757 10.3408L25.4421 23.0681H10.9094L18.1757 10.3408Z"
                    fill="white"
                  />
                  <path
                    d="M33.8972 0V35"
                    stroke="#5E5E5E"
                    strokeWidth="0.851887"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3127_10521">
                    <rect width="165.2" height="35" fill="white" />
                  </clipPath>
                </defs>
              </svg>
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

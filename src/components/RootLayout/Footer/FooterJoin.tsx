'use client'

import Link from 'next/link'

import { useSession } from 'next-auth/react'

export const FooterJoin = () => {
  const { data: session } = useSession()

  return (
    <>
      {session?.user ? (
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
    </>
  )
}

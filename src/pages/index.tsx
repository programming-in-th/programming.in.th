import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

import { PageLayout } from '@/components/Layout'

const Index = () => {
  const { data: session } = useSession()

  return (
    <PageLayout>
      <div className="flex h-screen flex-col items-center justify-start py-12">
        <section className="text-center mb-24 px-10">
          <p className="text-4xl sm:text-5xl font-semibold">
            <span className="block text-prog-primary-500 mb-4">
              ฝึกฝนทักษะการเขียนโปรแกรม
            </span>
            <span className="text-prog-gray-500">ด้วยโจทย์ที่หลากหลาย</span>
          </p>

          <p className="text-base sm:text-lg mt-8 text-prog-gray-500 leading-relaxed">
            เว็บไซต์ที่ผู้ใช้มากมายเชื่อมั่น ด้วยโจทย์ฝึกเขียนโปรแกรมถึง 726 ข้อ
            <br />
            และบทเรียนเกี่ยวกับ Data Structure & Algorithms
          </p>
        </section>

        {session ? (
          <div>
            Signed in as {session.user.name} <br />
          </div>
        ) : (
          <div>
            Not signed in <br />
          </div>
        )}
      </div>
    </PageLayout>
  )
}

export default Index

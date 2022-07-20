import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

import { PageLayout } from '@/components/Layout'
import Image from 'next/image'
import {
  CollectionIcon,
  DocumentSearchIcon,
  FireIcon,
  HeartIcon
} from '@heroicons/react/solid'
import { FeatureCard } from './components/FeatureCard'

const Index = () => {
  const { data: session } = useSession()

  return (
    <PageLayout>
      <div className="flex min-h-screen flex-col items-center justify-start pt-12">
        <section className="text-center mb-12 px-10">
          <p className="text-2xl sm:text-5xl font-semibold leading-tight">
            <span className="block text-prog-primary-500 mb-3">
              ฝึกฝนทักษะการเขียนโปรแกรม
            </span>
            <span className="text-prog-gray-500">ด้วยโจทย์ที่หลากหลาย</span>
          </p>

          <p className="text-sm sm:text-lg mt-4 text-prog-gray-500 leading-relaxed">
            เว็บไซต์ที่ผู้ใช้มากมายเชื่อมั่น ด้วยโจทย์ฝึกเขียนโปรแกรมถึง 726 ข้อ
            <br />
            และบทเรียนเกี่ยวกับ Data Structure & Algorithms
          </p>
        </section>

        <section className="flex items-center justify-center gap-4">
          <button className="landing-btn --primary">เข้าร่วม</button>
          <button className="landing-btn --normal">ค้นหาโจทย์</button>
        </section>

        <section className="relative my-6">
          <Image
            src="/assets/img/landing/coding.png"
            alt="PROGRAMMING.IN.TH"
            width={400}
            height={400}
            className="h-full w-full rounded-3xl object-cover"
          />
        </section>

        <section className="bg-white w-full p-10">
          <h2 className="text-xl sm:text-2xl text-center font-semibol mb-8">
            <span className="text-prog-primary-500">ทำไมต้อง</span>
            <br />
            Programming.in.th
          </h2>

          <p className="text-center text-prog-gray-500 font-light max-w-2xl mx-auto px-10">
            คำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรย
            ำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรยคำโปรย
          </p>
        </section>

        <section className="bg-white w-full p-16">
          <div className="grid gap-x-6 gap-y-14 grid-cols-1 max-w-6xl mx-auto sm:grid-cols-2">
            <FeatureCard
              title="ระบบตรวจ Submission สุดทันสมัย"
              description="สามารถทราบคะแนน ของ Submission คุณแบบ Real Time ด้วยระบบตรวจที่สร้างมาเพื่อเว็บนี้โดยเฉพาะ"
              Icon={DocumentSearchIcon}
            />
            <FeatureCard
              title="เชื่อมันโดยผู้ใช้มากมาย"
              description="เว็บไซต์ของเราประกอบไปด้วยโจทย์ปัญหาคุณภาพสูงนับร้อยข้อที่ให้คุณได้ฝึกฝนตั้งแต่ระดับมือใหม่ จนถึงการแข่งขันนานาชาติ"
              Icon={HeartIcon}
            />
            <FeatureCard
              title="พัฒนาตนเองได้ทุกระดับ"
              description="คลังโจทย์ขนาดใหญ่จากหลากหลายที่มา พัฒนาทักษะการแก้ปัญหาได้อย่างมีประสิทธิภาพ"
              Icon={CollectionIcon}
            />
            <FeatureCard
              title="ประสบการณ์การฝึกฝนที่ลงตัว"
              description="เว็บได้รับการออกแบบมาเพื่อความสะดวกและรวดเร็ว ทำให้การทำโจทย์เป็นไปได้อย่างราบรื่น"
              Icon={FireIcon}
            />
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

export default Index

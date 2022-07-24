import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

import { PageLayout } from '@/components/Layout'
import Image from 'next/image'
import {
  CollectionIcon,
  DocumentSearchIcon,
  FireIcon,
  HeartIcon
} from '@heroicons/react/solid'
import { FeatureCard } from '@/components/Landing/FeatureCard'
import { PeopleVector } from '@/vectors/Illustrations/People'
import { TestimonyCard } from '@/components/Landing/TestimonyCard'
import Link from 'next/link'
import { BGCurve } from '@/vectors/BGCurve'
import { IncrementalNumber } from '@/components/Landing/IncrementalNumber'

const Landing = () => {
  const { data: session } = useSession()

  return (
    <PageLayout>
      <div className="flex min-h-screen flex-col items-center justify-start pt-12">
        <section className="text-center mb-8 px-10">
          <p className="text-2xl sm:text-4xl font-semibold leading-[1]">
            <span className="block text-prog-primary-500 mb-3">
              ฝึกฝนทักษะการเขียนโปรแกรม
            </span>
            <span className="text-prog-gray-500">ด้วยโจทย์ที่หลากหลาย</span>
          </p>

          <p className="text-sm sm:text-base mt-4 text-prog-gray-500 leading-relaxed">
            เว็บไซต์ที่ผู้ใช้มากมายเชื่อมั่น ด้วยโจทย์ฝึกเขียนโปรแกรมถึง 726 ข้อ
            <br />
            และบทเรียนเกี่ยวกับ Data Structure & Algorithms
          </p>
        </section>

        <section className="flex items-center justify-center gap-4">
          <Link href="/login" passHref>
            <a className="landing-btn --primary">เข้าร่วม</a>
          </Link>
          <Link href="/tasks" passHref>
            <a className="landing-btn --normal">ค้นหาโจทย์</a>
          </Link>
        </section>

        <section className="relative py-6 overflow-hidden flex justify-center w-full">
          <div className="relative z-10">
            <Image
              src="/assets/img/landing/coding.png"
              alt="PROGRAMMING.IN.TH"
              width={400}
              height={400}
              className="h-full w-full rounded-3xl object-cover"
            />
          </div>

          <BGCurve className="absolute bottom-0" />
        </section>

        <section className="bg-white w-full pb-10">
          <h2 className="text-xl sm:text-2xl text-center font-semibold mb-8">
            <span className="text-prog-primary-500">ทำไมต้อง</span>
            <br />
            <span className="text-prog-gray-500">Programming.in.th</span>
          </h2>

          <p className="text-center text-prog-gray-500 font-light max-w-2xl mx-auto px-10">
            ทำไม programming.in.th จึงเป็นเว็บไซต์ที่ใช้ฝึกฝน
            <br />
            competitive programming อันดับ 1 ของประเทศไทย
          </p>
        </section>

        <section className="bg-white w-full p-6 sm:p-16">
          <div className="grid gap-x-6 gap-y-14 grid-cols-1 max-w-6xl mx-auto sm:grid-cols-2">
            <FeatureCard
              title="ระบบตรวจ Submission สุดทันสมัย"
              description={`สามารถทราบคะแนน\nของ Submission คุณแบบ Real Time\nด้วยระบบตรวจที่สร้างมาเพื่อเว็บนี้โดยเฉพาะ`}
              Icon={DocumentSearchIcon}
            />
            <FeatureCard
              title="เชื่อมั่นโดยผู้ใช้มากมาย"
              description={`เว็บไซต์ของเราประกอบไปด้วยโจทย์ปัญหาคุณภาพสูงนับร้อยข้อที่ให้คุณได้ฝึกฝนตั้งแต่ระดับมือใหม่\nจนถึงการแข่งขันนานาชาติ`}
              Icon={HeartIcon}
            />
            <FeatureCard
              title="พัฒนาตนเองได้ทุกระดับ"
              description={`คลังโจทย์ขนาดใหญ่จากหลากหลายที่มา\nพัฒนาทักษะการแก้ปัญหาได้อย่างมีประสิทธิภาพ`}
              Icon={CollectionIcon}
            />
            <FeatureCard
              title="ประสบการณ์การฝึกฝนที่ลงตัว"
              description={`เว็บได้รับการออกแบบมาเพื่อความสะดวกและรวดเร็ว\nทำให้การทำโจทย์เป็นไปได้อย่างราบรื่น`}
              Icon={FireIcon}
            />
          </div>
        </section>

        <section className="bg-white w-full px-6 sm:px-10 py-10 sm:py-24">
          <div
            style={{
              background:
                'linear-gradient(180deg, #FFF 0%, #FFF 29%, #F8FAFC 30%, #F8FAFC 100%)'
            }}
            className="max-w-6xl lg:px-8 xl:px-36 mx-auto grid grid-cols-1 sm:grid-cols-2 items-center justify-center"
          >
            <PeopleVector className="mx-auto w-full px-12" />
            <div className="flex flex-col items-center pb-6 sm:pb-0 sm:pt-20 justify-center text-center">
              <p className="text-prog-gray-500 font-light">จำนวนผู้ใช้กว่า</p>
              <div className="text-6xl text-prog-primary-500 font-semibold">
                <IncrementalNumber start={1} end={13071} />
              </div>
              <p className="text-2xl text-prog-gray-500 font-semibold">คน</p>
            </div>
          </div>
        </section>

        <section className="bg-white w-full p-10">
          <div className="grid gap-4 grid-cols-1 max-w-6xl mx-auto sm:grid-cols-2">
            <TestimonyCard
              title="เขมนันท์ มณีศรี (จอม)"
              description="ไม่ว่าคุณจะอยู่ระดับไหน เว็บไซต์ programming.in.th ก็พร้อมที่จะพาคุณไปสู่เป้าหมายได้อย่างง่ายดาย ด้วยโจทย์ที่หลากหลาย และความสะดวกสบายในการใช้งาน ซึ่งผมก็ต้องบอกว่า เว็บไซต์นี้สามารถทำให้ผมสามารถมาถึงจุดนี้ได้"
              imgURL="/assets/img/landing/review-1.png"
              role="ผู้แทนโอลิมปิกวิชาการ วิชาคอมพิวเตอร์ (IOI) ประจำปีการศึกษา 2565"
            />
            <TestimonyCard
              title="พิทักษ์พงศ์ กปิญชรานนท์ (เต็ม)"
              description="จากการที่ผมได้ใช้เว็บไซต์จำนวนมากในการทำโจทย์ competitive programming ผมบอกได้เลยว่าเว็บไซต์ programming.in.th ด้วยความสะดวกสบายในการใช้งาน การออกแบบที่สวยงาม และโจทย์ที่เป็นภาษาไทย เป็นเว็บไซต์อันดับ 1 ที่ผมแนะนำให้ทุกคนใช้ ตั้งแต่ระดับมือใหม่จนถึงมือโปร"
              imgURL="/assets/img/landing/review-2.png"
              role="ผู้แทนโอลิมปิกวิชาการ วิชาคอมพิวเตอร์ (IOI) ประจำปีการศึกษา 2565"
            />
            <TestimonyCard
              title="โมกข์ วรรธนะโสภณ (โมกข์)"
              description="programming.in.th เป็นแหล่งรวมโจทย์ competitive programming ที่มีความหลากหลายมากที่สุดในไทยแล้วครับ สำหรับใครที่กำลังตามหาโจทย์ในการเริ่มฝึกทักษะการเขียนโปรแกรมของตัวเองอยู่ ผมก็คงแนะนำเว็บไซต์ไหนไปไม่ได้นอกจากที่นี่เลยครับ"
              imgURL="/assets/img/landing/review-3.png"
              role="ผู้แทนโอลิมปิกวิชาการ วิชาคอมพิวเตอร์ (IOI) ประจำปีการศึกษา 2565"
            />
            <TestimonyCard
              title="กฤษฏ์ สุวรรณไพบูลย์ (กฤษฏ์)"
              description="programming.in.th เป็นเว็บที่เปลี่ยนชีวิตผม ผมเข้ามาใช้ทุกวัน ดีมากจริง ๆ ครับ แนะนำเลย เหมาะกับทุกคน ไม่ว่าจะมือใหม่หรือมือโปรก็ใช้ได้ใช้ดี"
              imgURL="/assets/img/landing/review-4.png"
              role="ผู้แทนโอลิมปิกวิชาการ วิชาคอมพิวเตอร์ (IOI) ประจำปีการศึกษา 2565"
            />
          </div>
        </section>

        <section className="w-full py-20 px-16 flex flex-col justify-center text-center">
          <p className="font-semibold leading-tight">
            <span className="text-xl sm:text-2xl block mb-1 text-prog-gray-500">
              วันนี้
            </span>
            <span className="text-2xl sm:text-4xl text-prog-primary-500">
              คุณทำโจทย์แล้วหรือยัง
            </span>
          </p>

          <div className="mt-12">
            <Link href="/tasks" passHref>
              <a className="inline mt-4 rounded-md bg-prog-primary-500 trasition-colors hover:bg-prog-primary-600 py-2.5 px-9 text-white">
                เริ่มเลย
              </a>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

export default Landing

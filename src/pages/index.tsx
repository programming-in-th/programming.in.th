import React from 'react'

import Link from 'next/link'

import {
  CollectionIcon,
  DocumentSearchIcon,
  FireIcon,
  HeartIcon
} from '@heroicons/react/solid'
import Image from 'next/legacy/image'

import { FeatureCard } from '@/components/Landing/FeatureCard'
import { IncrementalNumber } from '@/components/Landing/IncrementalNumber'
import { TestimonyCard } from '@/components/Landing/TestimonyCard'
import { PageLayout } from '@/components/Layout'
import { BGCurve } from '@/svg/BGCurve'
import { PeopleVector } from '@/svg/Illustrations/People'

const Landing = () => {
  return (
    <PageLayout>
      <div className="flex min-h-screen flex-col items-center justify-start pt-12">
        <section className="mb-8 px-10 text-center">
          <p className="text-2xl font-semibold leading-[1] sm:text-4xl">
            <span className="mb-3 block text-prog-primary-500">
              ฝึกฝนทักษะการเขียนโปรแกรม
            </span>
            <span className="text-prog-gray-500 dark:text-gray-100">
              ด้วยโจทย์ที่หลากหลาย
            </span>
          </p>

          <p className="mt-4 text-sm leading-relaxed text-prog-gray-500 dark:text-slate-200 sm:text-base">
            เว็บไซต์ที่ผู้ใช้มากมายเชื่อมั่น ด้วยโจทย์ฝึกเขียนโปรแกรมถึง 726 ข้อ
            <br />
            และบทเรียนเกี่ยวกับ Data Structure & Algorithms
          </p>
        </section>

        <section className="flex items-center justify-center gap-4">
          <Link href="/login" passHref className="landing-btn --primary">
            เข้าร่วม
          </Link>
          <Link href="/tasks" passHref className="landing-btn --normal">
            ค้นหาโจทย์
          </Link>
        </section>

        <section className="relative flex w-full justify-center overflow-hidden py-6">
          <div className="relative z-10">
            <Image
              src="/assets/img/landing/coding.png"
              alt="PROGRAMMING.IN.TH"
              width={400}
              height={400}
              className="h-full w-full rounded-3xl object-cover"
            />
          </div>

          <BGCurve className="absolute bottom-0 text-white dark:text-slate-800" />
        </section>

        <section className="w-full bg-white pb-10 dark:bg-slate-800">
          <h2 className="mb-8 text-center text-xl font-semibold sm:text-2xl">
            <span className="text-prog-primary-500">ทำไมต้อง</span>
            <br />
            <span className="text-prog-gray-500 dark:text-gray-200">
              Programming.in.th
            </span>
          </h2>

          <p className="mx-auto max-w-2xl px-10 text-center font-light text-prog-gray-500 dark:text-slate-200">
            ทำไม programming.in.th จึงเป็นเว็บไซต์ที่ใช้ฝึกฝน
            <br />
            competitive programming อันดับ 1 ของประเทศไทย
          </p>
        </section>

        <section className="w-full bg-white p-6 dark:bg-slate-800 sm:p-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2">
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

        <section className="w-full bg-white px-6 py-10 dark:bg-slate-800 sm:px-10 sm:py-24">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center justify-center bg-gradient-to-b from-prog-white-100 to-prog-white-500 dark:bg-none sm:grid-cols-2 lg:px-8 xl:px-36">
            <PeopleVector className="mx-auto w-full px-12" />
            <div className="flex flex-col items-center justify-center pb-6 text-center sm:pb-0 sm:pt-20">
              <p className="font-light text-prog-gray-500 dark:text-gray-200">
                จำนวนผู้ใช้กว่า
              </p>
              <div className="text-6xl font-semibold text-prog-primary-500">
                <IncrementalNumber start={1} end={13071} />
              </div>
              <p className="text-2xl font-semibold text-prog-gray-500 dark:text-gray-200">
                คน
              </p>
            </div>
          </div>
        </section>

        <section className="w-full bg-white p-10 dark:bg-slate-800">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2">
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
              description="
              ถ้านึกถึงการฝึกโจทย์ programming สำหรับค่ายสอวน. แน่นอนว่าต้องเว็บไซต์นี้เลยครับ programming.in.th นี้มี feature ที่เหมาะสมกับการฝึกฝนโจทย์ด้วยตนเอง และยังมี interface ที่สวยงาม ใช้แล้วสบายตามากครับ"
              imgURL="/assets/img/landing/review-4.png"
              role="ผู้แทนโอลิมปิกวิชาการ วิชาคอมพิวเตอร์ (IOI) ประจำปีการศึกษา 2565"
            />
          </div>
        </section>

        <section className="flex w-full flex-col justify-center px-16 py-20 text-center">
          <p className="font-semibold leading-tight">
            <span className="mb-1 block text-xl text-prog-gray-500 dark:text-gray-200 sm:text-2xl">
              วันนี้
            </span>
            <span className="text-2xl text-prog-primary-500 sm:text-4xl">
              คุณทำโจทย์แล้วหรือยัง
            </span>
          </p>

          <div className="mt-12">
            <Link
              href="/tasks"
              passHref
              className="trasition-colors mt-4 inline rounded-md bg-prog-primary-500 py-2.5 px-9 text-white hover:bg-prog-primary-600"
            >
              เริ่มเลย
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

export default Landing

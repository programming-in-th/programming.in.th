import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  CollectionIcon,
  DocumentSearchIcon,
  FireIcon,
  HeartIcon
} from '@heroicons/react/solid'

import { PageLayout } from '@/components/Layout'
import { FeatureCard } from '@/components/Landing/FeatureCard'
import { TestimonyCard } from '@/components/Landing/TestimonyCard'
import { IncrementalNumber } from '@/components/Landing/IncrementalNumber'

import { PeopleVector } from '@/svg/Illustrations/People'
import { BGCurve } from '@/svg/BGCurve'

const Landing = () => {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-start min-h-screen pt-12">
        <section className="px-10 mb-8 text-center">
          <p className="text-2xl sm:text-4xl font-semibold leading-[1]">
            <span className="block mb-3 text-prog-primary-500">
              ฝึกฝนทักษะการเขียนโปรแกรม
            </span>
            <span className="text-prog-gray-500">ด้วยโจทย์ที่หลากหลาย</span>
          </p>

          <p className="mt-4 text-sm leading-relaxed sm:text-base text-prog-gray-500">
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

        <section className="relative flex justify-center w-full py-6 overflow-hidden">
          <div className="relative z-10">
            <Image
              src="/assets/img/landing/coding.png"
              alt="PROGRAMMING.IN.TH"
              width={400}
              height={400}
              className="object-cover w-full h-full rounded-3xl"
            />
          </div>

          <BGCurve className="absolute bottom-0" />
        </section>

        <section className="w-full pb-10 bg-white">
          <h2 className="mb-8 text-xl font-semibold text-center sm:text-2xl">
            <span className="text-prog-primary-500">ทำไมต้อง</span>
            <br />
            <span className="text-prog-gray-500">Programming.in.th</span>
          </h2>

          <p className="max-w-2xl px-10 mx-auto font-light text-center text-prog-gray-500">
            ทำไม programming.in.th จึงเป็นเว็บไซต์ที่ใช้ฝึกฝน
            <br />
            competitive programming อันดับ 1 ของประเทศไทย
          </p>
        </section>

        <section className="w-full p-6 bg-white sm:p-16">
          <div className="grid max-w-6xl grid-cols-1 mx-auto gap-x-6 gap-y-14 sm:grid-cols-2">
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

        <section className="w-full px-6 py-10 bg-white sm:px-10 sm:py-24">
          <div
            style={{
              background:
                'linear-gradient(180deg, #FFF 0%, #FFF 29%, #F8FAFC 30%, #F8FAFC 100%)'
            }}
            className="grid items-center justify-center max-w-6xl grid-cols-1 mx-auto lg:px-8 xl:px-36 sm:grid-cols-2"
          >
            <PeopleVector className="w-full px-12 mx-auto" />
            <div className="flex flex-col items-center justify-center pb-6 text-center sm:pb-0 sm:pt-20">
              <p className="font-light text-prog-gray-500">จำนวนผู้ใช้กว่า</p>
              <div className="text-6xl font-semibold text-prog-primary-500">
                <IncrementalNumber start={1} end={13071} />
              </div>
              <p className="text-2xl font-semibold text-prog-gray-500">คน</p>
            </div>
          </div>
        </section>

        <section className="w-full p-10 bg-white">
          <div className="grid max-w-6xl grid-cols-1 gap-4 mx-auto sm:grid-cols-2">
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

        <section className="flex flex-col justify-center w-full px-16 py-20 text-center">
          <p className="font-semibold leading-tight">
            <span className="block mb-1 text-xl sm:text-2xl text-prog-gray-500">
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

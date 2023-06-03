import { type NextPage } from 'next'

import Image from 'next/image'

import { PoweredByVercel } from '@/components/RootLayout/PoweredByVercel'

const About: NextPage = () => {
  return (
    <main className="mt-24 flex min-h-screen flex-col items-center text-center">
      <h1 className="text-2xl font-semibold text-gray-600 sm:text-4xl ">
        เกี่ยวกับเรา
      </h1>

      <section className="my-6 max-w-2xl text-gray-500">
        <p>
          programming.in.th
          ถูกพัฒนาโดยกลุ่มนักเรียนค่ายโอลิมปิกวิชาการคอมพิวเตอร์
          และนักเรียนที่มีความสนใจเกี่ยวกับคอมพิวเตอร์
          เพื่อสร้างพื้นสำหรับการฝึกฝน competitive programming
          โดยถูกออกแบบให้สามารถใช้งานสำหรับการเขียนโปรแกรมได้ทุกระดับ
          ตั้งแต่ระดับมือใหม่ จนถึงการแข่งขันนานาชาติ
        </p>
        <p>
          พวกเราเป็นเพียงกลุ่มอดีตนักเรียนที่มีแนวคิดและความเชื่อมั่นร่วมกันที่จะพัฒนาการเรียนการสอนวิชาคอมพิวเตอร์ให้ดียิ่งขึ้นต่อไปในอนาคต
          หากสนใจร่วมงานกับพวกเรา สามารถติดต่อเราได้
        </p>
        <p>- team -</p>
      </section>

      <section className="my-16">
        <Image
          width="539"
          height="275"
          src="assets/img/landing/collab.svg"
          alt="Collaboration"
        />

        <div className="flex items-center justify-center gap-8">
          <PoweredByVercel />
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
      </section>
    </main>
  )
}

export default About

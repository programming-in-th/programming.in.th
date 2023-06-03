import { type NextPage } from 'next'

import Image from 'next/image'
import Link from 'next/link'

import { FaGithub } from 'react-icons/fa'
import { PoweredByVercel } from '@/components/RootLayout/PoweredByVercel'
import TeamMember from '@/data/team.json'

const About: NextPage = () => {
  return (
    <main className="mt-24 flex min-h-screen flex-col items-center text-center">
      <h1 className="text-2xl font-semibold text-gray-600 dark:text-white sm:text-4xl">
        เกี่ยวกับเรา
      </h1>

      <section className="my-6 max-w-2xl text-xl text-gray-500 dark:text-gray-200">
        <p>
          programming.in.th
          ถูกพัฒนาโดยกลุ่มนักเรียนค่ายโอลิมปิกวิชาการคอมพิวเตอร์
          และนักเรียนที่มีความสนใจเกี่ยวกับคอมพิวเตอร์
          เพื่อสร้างพื้นสำหรับการฝึกฝน competitive programming
          โดยถูกออกแบบให้สามารถใช้งานสำหรับการเขียนโปรแกรมได้ทุกระดับ
          ตั้งแต่ระดับมือใหม่ จนถึงการแข่งขันนานาชาติ
        </p>
        <br />
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

      <section className="min-h-screen w-full bg-gray-50 dark:bg-slate-700">
        <h1 className="mt-20 text-2xl font-bold text-gray-600 dark:text-white">
          Our team
        </h1>
        <p className="text-gray-500 dark:text-gray-200">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </p>
        <div className="my-4 flex flex-wrap items-center justify-center gap-x-5">
          {TeamMember.map((Member, index) => (
            <div key={index} className="my-4 flex w-1/4 flex-col">
              <div className="h-[300px] w-full rounded-lg bg-white"></div>
              <div className="text-left">
                <p className="mt-2 text-xl font-bold text-gray-600 dark:text-white">
                  {Member.name}
                </p>
                <p className="mt-1 text-lg">{Member.position}</p>
                <Link href={`https://github.com/${Member.github}`}>
                  <FaGithub size={25} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default About

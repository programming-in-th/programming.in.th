'use client'

import Image from 'next/image'

import { Collaborator } from '@/components/About/Collaborator'
import { CoreTeam } from '@/components/About/CoreTeam'
import { PoweredByVercel } from '@/components/RootLayout/PoweredByVercel'
import { GithubMemberProps } from '@/types/GithubMemberProps'

export async function fetchData(url: string) {
  const res = await fetch(url, { cache: 'force-cache' })

  if (res.ok === false) {
    return []
  }
  return res.json()
}

export default async function About() {
  const coreTeam = await fetchData(
    'https://api.github.com/orgs/programming-in-th/public_members'
  )
  const contributors = await fetchData(
    'https://api.github.com/repos/programming-in-th/programming.in.th/contributors'
  )

  const collaborators = contributors.filter(
    (contributor: GithubMemberProps) =>
      !coreTeam.find(
        (member: GithubMemberProps) => member.login === contributor.login
      )
  )

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
        <h1 className="mt-20 text-2xl font-semibold text-gray-600 dark:text-white sm:text-4xl">
          Our team
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-200">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </p>
        <CoreTeam coreTeam={coreTeam} />
        <Collaborator collaborators={collaborators} />
      </section>
    </main>
  )
}

// export default About

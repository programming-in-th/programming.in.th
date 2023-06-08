import Image from 'next/image'

import { PoweredByVercel } from '@/components/RootLayout/PoweredByVercel'

import { ContributorSection } from './ContributorSection'
import { CoreTeamSection } from './CoreTeamSection'
import { Contributor, OrgMember } from './types'

async function fetchData<T>(url: string, defaultValue: T) {
  const res = await fetch(url, { next: { revalidate: 3600 } })

  if (!res || res.ok === false) {
    return defaultValue
  }

  const response = await res.json()
  return response as T
}

export default async function About() {
  const coreteamPromise = fetchData<OrgMember[]>(
    'https://api.github.com/orgs/programming-in-th/public_members',
    []
  )

  const contributorsPromise = fetchData<Contributor[]>(
    'https://api.github.com/repos/programming-in-th/programming.in.th/contributors',
    []
  )

  const coreTeam = await coreteamPromise
  const contributors = (await contributorsPromise).filter(
    contributor => !coreTeam.find(member => member.login === contributor.login)
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
        <CoreTeamSection coreTeam={coreTeam} />
        <ContributorSection contributors={contributors} />
      </section>
    </main>
  )
}

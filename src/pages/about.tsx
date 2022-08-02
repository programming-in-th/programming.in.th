import { PageLayout } from '@/components/Layout'
import { NextPage } from 'next'
import Link from 'next/link'

const About: NextPage = () => {
  return (
    <PageLayout>
      <section className="flex flex-col items-center min-h-screen mt-24 text-center">
        <h1 className="text-2xl font-semibold sm:text-4xl text-prog-primary-500">
          Coming Soon...
        </h1>
        <Link href="/" passHref>
          <a className="mt-2 text-prog-gray-500">กลับหน้าหลัก</a>
        </Link>
      </section>
    </PageLayout>
  )
}

export default About

import { PageLayout } from '@/components/Layout'
import { NextPage } from 'next'
import Link from 'next/link'

const Learn: NextPage = () => {
  return (
    <PageLayout>
      <section className="mt-24 flex min-h-screen flex-col items-center text-center">
        <h1 className="text-2xl font-semibold text-prog-primary-500 sm:text-4xl">
          Coming Soon...
        </h1>
        <Link href="/" passHref>
          <a className="mt-2 text-prog-gray-500">กลับหน้าหลัก</a>
        </Link>
      </section>
    </PageLayout>
  )
}

export default Learn

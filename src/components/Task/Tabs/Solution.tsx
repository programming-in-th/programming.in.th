'use client'

import Link from 'next/link'

import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import components from '@/components/common/MDXComponents'

import 'katex/dist/katex.min.css'

const SolutionTab = ({
  taskId,
  solution
}: {
  taskId: string
  solution: MDXRemoteSerializeResult | null
}) => {
  if (!solution) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <ExclamationCircleIcon className="my-4 h-8 w-8 text-gray-500 dark:text-gray-100" />

        <h1 className="font-bold text-gray-600 dark:text-gray-50">
          โจทย์ข้อนี้ยังไม่มีเฉลย
        </h1>
        <p className="text-gray-400 dark:text-gray-100">ขออภัยในความไม่สะดวก</p>

        <section className="flex flex-col gap-2">
          <Link href={`/tasks/${taskId}/submissions`}>
            <button className="w-full rounded-lg bg-gray-500 px-6 py-5 text-white">
              ดู Submission คนอื่น
            </button>
          </Link>

          <a
            href="https://github.com/programming-in-th/solutions"
            target="_blank"
          >
            <button className="w-full rounded-lg bg-gray-50 px-6 py-5 text-gray-500">
              ส่งเฉลย
            </button>
          </a>
        </section>
      </div>
    )
  }

  return (
    <article className="prose mt-4 w-full max-w-none dark:prose-invert dark:prose-headings:text-white">
      <MDXRemote {...solution} components={components} />
    </article>
  )
}

export default SolutionTab

'use client'

import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import components from '@/components/common/MDXComponents'

const RenderUnderConstruction = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 pt-10">
      <ExclamationCircleIcon className="my-4 h-8 w-8 text-gray-500 dark:text-gray-100" />

      <h1 className="font-bold text-gray-600 dark:text-gray-50">
        เนื้อหาส่วนนี้ยังไม่สมบูรณ์
      </h1>
      <p className="text-gray-400 dark:text-gray-100">ขออภัยในความไม่สะดวก</p>
    </div>
  )
}

export const RenderContent = ({
  content_md
}: {
  content_md: MDXRemoteSerializeResult | null
}) => {
  if (!content_md) return <RenderUnderConstruction />

  return (
    <div className="item-center m-6 mx-auto flex flex-col justify-center gap-6">
      <div className="max-w-5xl">
        <article className="prose mt-4 w-full max-w-none dark:prose-invert dark:prose-headings:text-white">
          <MDXRemote {...content_md} components={components} />
        </article>
      </div>
    </div>
  )
}

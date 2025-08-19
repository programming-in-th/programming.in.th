'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import components from '@/components/common/MDXComponents'

const RenderUnderConstruction = () => {
  return (
    <div className="group w-full items-center justify-between py-1">
      Under Construction
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

'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import components from '@/components/common/MDXComponents'

import 'katex/dist/katex.min.css'

const articleClsx = 'prose mt-4 w-full max-w-none dark:text-gray-100'

const SolutionTab = ({
  solution
}: {
  solution: MDXRemoteSerializeResult | null
}) => {
  if (!solution) {
    return (
      <article className={articleClsx}>
        <h1 className="text-2xl font-bold">Solution does not exist</h1>

        <p>
          You can write and submit one at{' '}
          <a
            href="https://github.com/programming-in-th/solutions"
            target="_blank"
          >
            https://github.com/programming-in-th/solutions
          </a>
        </p>
      </article>
    )
  }

  return (
    <article className={articleClsx}>
      <MDXRemote
        {...solution}
        components={
          {
            ...components
          } as any
        }
      />
    </article>
  )
}

export default SolutionTab

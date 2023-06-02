'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import components from '@/components/common/MDXComponents'

import 'katex/dist/katex.min.css'

const articleClsx =
  'prose dark:prose-headings:text-white dark:prose-invert mt-4 w-full max-w-none'

const SolutionTab = ({
  solution
}: {
  solution: MDXRemoteSerializeResult | null
}) => {
  if (!solution) {
    return (
      <article className={articleClsx}>
        <h1>Solution does not exist</h1>

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

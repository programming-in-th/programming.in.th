'use client'

import Head from 'next/head'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import components from '@/components/common/MDXComponents'

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
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
          integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
          crossOrigin="anonymous"
        />
      </Head>
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
    </>
  )
}

export default SolutionTab

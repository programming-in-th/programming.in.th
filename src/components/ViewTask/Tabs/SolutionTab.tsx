import React, { FC, memo } from 'react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import components from '@/components/common/MDXComponents'
import Head from 'next/head'

const SolutionTab: FC<{ solution: MDXRemoteSerializeResult }> = ({
  solution
}) => {
  if (solution) {
    return (
      <React.Fragment>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
            integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
            crossOrigin="anonymous"
          />
        </Head>
        <div className="prose mt-4 w-full max-w-none">
          <MDXRemote
            {...solution}
            components={
              {
                ...components
              } as any
            }
          />
        </div>
      </React.Fragment>
    )
  }

  return <h1>Solution does not exist!</h1>
}

export default SolutionTab

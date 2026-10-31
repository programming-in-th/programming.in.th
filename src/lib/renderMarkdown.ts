import { serialize } from 'next-mdx-remote/serialize'
import autolinkHeadings from 'rehype-autolink-headings'
import katex from 'rehype-katex'
import highlight from 'rehype-prism-plus'
import slug from 'rehype-slug'
import gfm from 'remark-gfm'
import math from 'remark-math'

// Use 'md' for content non-admins write: 'mdx' also compiles raw JSX/HTML.
export async function mdxToHtml(source: string, format: 'mdx' | 'md' = 'mdx') {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [gfm, math],
      rehypePlugins: [
        slug,
        [
          autolinkHeadings,
          {
            properties: {
              className: ['anchor']
            }
          }
        ],
        katex,
        highlight
      ],
      format
    }
  })

  return mdxSource
}

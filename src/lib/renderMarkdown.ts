import { serialize } from 'next-mdx-remote/serialize'
import autolinkHeadings from 'rehype-autolink-headings'
import katex from 'rehype-katex'
import highlight from 'rehype-prism-plus'
import slug from 'rehype-slug'
import gfm from 'remark-gfm'
import math from 'remark-math'

export async function mdxToHtml(source: string) {
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
      format: 'mdx'
    }
  })

  return mdxSource
}

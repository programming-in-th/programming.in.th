import unified from 'unified'
import parse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import math from 'remark-math'
import katex from 'rehype-katex'
import highlight from '@mapbox/rehype-prism'
import html from 'rehype-stringify'
import sanitize from 'rehype-sanitize'

import githubSchema from 'hast-util-sanitize/lib/github.json'

githubSchema.attributes['*'].push('className')

// import sanitizeSetting from './sanitizer.json'

export const renderMarkdown = async (content: string) => {
  try {
    const result = await unified()
      .use(parse)
      .use(math)
      .use(remark2rehype)
      .use(sanitize, githubSchema)
      .use(katex)
      .use(highlight)
      .use(html)
      .process(content)

    return result.toString()
  } catch (err) {
    console.error(`Markdown rendering error: ${err}`)
    throw err
  }
}

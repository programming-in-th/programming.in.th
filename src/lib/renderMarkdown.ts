import { unified } from 'unified'
import parse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import math from 'remark-math'
import katex from 'rehype-katex'
import highlight from 'lib/highlight'
import html from 'rehype-stringify'

export const renderMarkdown = async (content: string) => {
  try {
    const result = await unified()
      .use(parse)
      .use(math)
      .use(remark2rehype)
      .use(katex)
      .use(highlight)
      .use(html, { allowDangerousHtml: true })
      .process(content)

    return result.toString()
  } catch (err) {
    console.error(`Markdown rendering error: ${err}`)
    throw err
  }
}

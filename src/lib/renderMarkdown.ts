import unified from 'unified'
import parse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import math from 'remark-math'
import katex from 'rehype-katex'
import stringify from 'rehype-stringify'
import sanitize from 'rehype-sanitize'
import highlight from '@mapbox/rehype-prism'

import sanitizeSetting from './sanitizer.json'

export const renderMarkdown = async (content: string) => {
  const result = await unified()
    .use(parse)
    .use(math)
    .use(remark2rehype)
    .use(katex)
    .use(highlight)
    .use(stringify)
    .use(sanitize, sanitizeSetting)
    .process(content)

  return result.toString()
}

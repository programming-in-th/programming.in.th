import unified from 'unified'
import { VFileCompatible } from 'vfile'
import parse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import math from 'remark-math'
import katex from 'rehype-katex'
import stringify from 'rehype-stringify'
import sanitize from 'rehype-sanitize'
import highlight from 'rehype-highlight'

import sanitizeSetting from './sanitizer.json'

export const renderMarkdown = (content: string) => {
  const processor = unified()
    .use(parse)
    .use(math)
    .use(remark2rehype)
    .use(katex)
    .use(highlight)
    .use(stringify)
    .use(sanitize, sanitizeSetting)

  const processMarkdown = (content: VFileCompatible) => {
    const result = processor.processSync(content).contents
    return String(result)
  }

  return processMarkdown(content)
}

import React from 'react'
import unified from 'unified'
import { VFileCompatible } from 'vfile'
import parse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import math from 'remark-math'
import katex from 'rehype-katex'
import stringify from 'rehype-stringify'
import sanitize from 'rehype-sanitize'
import highlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css'

import sanitizeSetting from './sanitizer.json'
import { MarkDownStyle } from '../../design'

interface IMarkdownRenderProps {
  content: string
}

export const MarkdownRenderer: React.FunctionComponent<
  IMarkdownRenderProps
> = props => {
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
    return { __html: String(result) }
  }

  return (
    <MarkDownStyle>
      <div dangerouslySetInnerHTML={processMarkdown(`${props.content}`)} />
    </MarkDownStyle>
  )
}

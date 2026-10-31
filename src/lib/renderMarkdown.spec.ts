// @vitest-environment node
import { describe, expect, it } from 'vitest'

import { mdxToHtml } from './renderMarkdown'

const source =
  '**bold** $x^2$\n\n<Note title="hi" />\n\n<section data-x="1">raw</section>'

describe('mdxToHtml', () => {
  it('drops raw HTML and JSX in md format but keeps Markdown and math', async () => {
    const { compiledSource } = await mdxToHtml(source, 'md')

    expect(compiledSource).not.toMatch(/Note|section|data-x/)
    expect(compiledSource).toContain('strong')
    expect(compiledSource).toContain('katex')
  })

  it('keeps JSX in the default mdx format', async () => {
    const { compiledSource } = await mdxToHtml(source)

    expect(compiledSource).toContain('section')
  })
})

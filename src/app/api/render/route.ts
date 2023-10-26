import { NextRequest } from 'next/server'

import { mdxToHtml } from '@/lib/renderMarkdown'
import { badRequest, json } from '@/utils/apiResponse'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const { content } = body

  if (!('content' in body) || typeof content !== 'string') {
    return badRequest()
  }

  const mdxSource = await mdxToHtml(content)
  return json(mdxSource)
}

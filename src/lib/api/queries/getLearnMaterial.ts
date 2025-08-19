import 'server-only'

import { notFound } from 'next/navigation'

import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { mdxToHtml } from '@/lib/renderMarkdown'

/**
 * Get learn material (md file), only used in server components
 *
 * @throws 404 Error
 */
export async function getLearnMaterial(
  id: string
): Promise<MDXRemoteSerializeResult | null> {
  if (!id) return notFound()

  let solution = null

  try {
    const solutionRes = await fetch(
      `${process.env.NEXT_PUBLIC_AWS_URL}/learnmat/md/${id}.md`
    )

    if (solutionRes.status === 200) {
      const raw = await solutionRes.text()
      solution = await mdxToHtml(raw)
    }
  } catch (error) {
    console.log(error)
  }
  return solution
}

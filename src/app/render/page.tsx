'use client'

import { useState } from 'react'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import components from '@/components/common/MDXComponents'

import 'katex/dist/katex.min.css'

export default function Render() {
  const [md, setMd] = useState('')
  const [loading, setLoading] = useState(false)

  const [rendered, setRendered] = useState<MDXRemoteSerializeResult>()

  async function render() {
    setLoading(true)
    const res = await fetch('/api/render', {
      method: 'POST',
      body: JSON.stringify({ content: md })
    })
    setRendered(await res.json())
    setLoading(false)
  }

  return (
    <div className="flex w-screen flex-col items-center gap-4 py-4">
      <div>
        <button
          className="rounded-md bg-prog-primary-500 p-2 text-lg font-bold disabled:bg-gray-500"
          onClick={() => render()}
          disabled={loading}
        >
          Render
        </button>
      </div>

      <div className="flex w-screen items-start justify-between px-8">
        <textarea
          className="w-[45vw] rounded-md border border-black p-2"
          cols={80}
          rows={100}
          value={md}
          onChange={e => setMd(e.currentTarget.value)}
        />

        <article className="prose w-[45vw] max-w-none dark:prose-invert dark:prose-headings:text-white">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            rendered && <MDXRemote {...rendered} components={components} />
          )}
        </article>
      </div>
    </div>
  )
}

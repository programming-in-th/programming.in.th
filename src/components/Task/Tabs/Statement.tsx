'use client'
// TODO Convert to Server Component

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import useSWR from 'swr'

import components from '@/components/common/MDXComponents'
import fetcher from '@/lib/fetcher'
import { TaskModel } from '@/prisma/models'

const StatementTab = ({ task }: { task: TaskModel }) => {
  const { data: mdStatement } = useSWR<MDXRemoteSerializeResult>(
    task.statement === 'MARKDOWN' ? `/api/tasks/${task.id}/statement` : null,
    fetcher
  )

  const [enablePDF, setEnablePDF] = useState<boolean>(true)

  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    const isMobile = /Mobi/.test(navigator.userAgent)

    if (isSafari && isMobile) {
      setEnablePDF(false)
    }
  }, [])

  if (task.statement === 'PDF') {
    return (
      <article className="h-screen">
        {!enablePDF ? (
          <p>
            This browser does not support inline PDFs. Please view the PDF by
            clicking <Link href={`/api/tasks/${task.id}/statement`}>here</Link>.
          </p>
        ) : (
          <embed
            src={`/api/tasks/${task.id}/statement`}
            width="100%"
            height="100%"
          />
        )}
      </article>
    )
  } else if (task.statement === 'MARKDOWN' && mdStatement) {
    return (
      <div className="prose mt-4 w-full max-w-none dark:text-gray-100">
        <MDXRemote {...mdStatement} components={components} />
      </div>
    )
  }

  return null
}

export default StatementTab

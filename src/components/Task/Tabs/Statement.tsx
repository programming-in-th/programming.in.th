'use client'
// TODO Convert to Server Component

import { Task } from '@prisma/client'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import useSWR from 'swr'

import components from '@/components/common/MDXComponents'
import fetcher from '@/lib/fetcher'

const StatementTab = ({ task }: { task: Task }) => {
  const { data: mdStatement } = useSWR<MDXRemoteSerializeResult>(
    task.statement === 'MARKDOWN' ? `/api/tasks/${task.id}/statement` : null,
    fetcher
  )

  if (task.statement === 'PDF') {
    return (
      <article className="h-screen">
        <embed
          src={`/api/tasks/${task.id}/statement`}
          width="100%"
          height="100%"
        />
      </article>
    )
  } else if (task.statement === 'MARKDOWN' && mdStatement) {
    return (
      <div className="prose mt-4 w-full max-w-none dark:text-gray-100">
        <MDXRemote
          {...mdStatement}
          components={
            {
              ...components
            } as any
          }
        />
      </div>
    )
  }

  return null
}

export default StatementTab

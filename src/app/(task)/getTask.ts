import { notFound } from 'next/navigation'

import checkUserPermissionOnTask from '@/lib/api/queries/checkUserPermissionOnTask'
import prisma from '@/lib/prisma'
import { mdxToHtml } from '@/lib/renderMarkdown'
import { getServerUser } from '@/lib/session'

/**
 * Get tasks, only used in server components
 *
 * @throws 404 Error
 */
export async function getTask(id: string, type = 'statement') {
  if (!id) {
    return notFound()
  }

  const task = await prisma.task.findFirst({
    where: { id }
  })

  if (task === null) {
    notFound()
  }

  if (task.private) {
    const user = await getServerUser()

    if (!user) notFound()

    if (!(await checkUserPermissionOnTask(user, task.id))) {
      notFound()
    }
  }

  let solution = null

  if (type === 'solution') {
    const solutionRes = await fetch(
      `${process.env.NEXT_PUBLIC_AWS_URL}/solutions/md/${id}.md`
    )

    if (solutionRes.status === 200) {
      const raw = await solutionRes.text()
      solution = await mdxToHtml(raw)
    }
  }

  return {
    solution,
    task,
    type
  }
}

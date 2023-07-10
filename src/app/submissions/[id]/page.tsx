import { notFound } from 'next/navigation'

import Submission from '@/components/Submission/Submission'
import { TaskLayout } from '@/components/Task/Layout'
import checkUserPermissionOnTask from '@/lib/api/queries/checkUserPermissionOnTask'
import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'

export default async function Submissions({
  params
}: {
  params: { id: string }
}) {
  const id = +params.id

  const task = (
    await prisma.submission.findUnique({
      where: { id },
      select: {
        task: true
      }
    })
  )?.task

  if (!task) {
    notFound()
  }

  if (task.private) {
    const user = await getServerUser()

    if (!user) notFound()

    if (!(await checkUserPermissionOnTask(user, task.id))) {
      notFound()
    }
  }

  return (
    <TaskLayout task={task} type="submission">
      <Submission task={task} submissionID={id} />
    </TaskLayout>
  )
}

import { Metadata } from 'next'

import { notFound } from 'next/navigation'

import Submission from '@/components/Submission/Submission'
import { TaskLayout } from '@/components/Task/Layout'
import checkUserPermissionOnTask from '@/lib/api/queries/checkUserPermissionOnTask'
import prisma from '@/lib/prisma'
import { getServerUser } from '@/lib/session'

export const metadata: Metadata = {
  title: 'Submission | programming.in.th'
}

export default async function Submissions(
  props: PageProps<'/submissions/[id]'>
) {
  const params = await props.params
  const id = +params.id

  const submission = await prisma.submission.findUnique({
    where: { id },
    select: {
      task: true,
      assessmentId: true
    }
  })
  const task = submission?.task
  const assessmentId =
    submission?.assessmentId === null ? undefined : submission?.assessmentId

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
    <TaskLayout task={task} type="submission" assessmentId={assessmentId}>
      <Submission task={task} submissionID={id} />
    </TaskLayout>
  )
}

import Submission from '@/components/Submission/Submission'
import prisma from '@/lib/prisma'

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
    return <div>Not found j3k</div>
  }

  console.log({ task, id })

  return <Submission task={task} submissionID={id} />
}

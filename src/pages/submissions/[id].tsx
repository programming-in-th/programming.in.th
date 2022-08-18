import { GetStaticPaths, GetStaticProps } from 'next'

import Submission from '@/components/Submission/Submission'
import { TaskLayout } from '@/components/Task/Layout'
import prisma from '@/lib/prisma'

const Submissions = ({ id, task }) => {
  return (
    <TaskLayout task={task} type="submissions">
      <Submission task={task} submissionID={id} />
    </TaskLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params

  const { task } = await prisma.submission.findUnique({
    where: { id: Number(id) },
    select: {
      task: true
    }
  })

  return {
    props: {
      id,
      task
    }
  }
}

export default Submissions

import { GetStaticPaths, GetStaticProps } from 'next'

import { Task } from '@prisma/client'

import Submission from '@/components/Submission/Submission'
import { TaskLayout } from '@/components/Task/Layout'
import prisma from '@/lib/prisma'

const Submissions = ({ id, task }: { id: string; task: Task }) => {
  return (
    <TaskLayout task={task} type="submissions">
      <Submission task={task} submissionID={Number(id)} />
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
  const { id } = params!

  if (typeof id !== 'string') {
    return {
      notFound: true
    }
  }

  const { task } = (await prisma.submission.findUnique({
    where: { id: Number(id) },
    select: {
      task: true
    }
  }))!

  return {
    props: {
      id,
      task
    }
  }
}

export default Submissions

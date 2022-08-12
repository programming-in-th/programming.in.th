import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'

import { useRouter } from 'next/router'

import { Task } from '@prisma/client'

import { RightDisplay } from '@/components/Task/RightDisplay'
import { Layout } from '@/components/Tasks/Layout'
import prisma from '@/lib/prisma'
import { mdxToHtml } from '@/lib/renderMarkdown'

const Tasks = ({
  task,
  type,
  solution
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback, query } = useRouter()
  let submissionID: null | number = null

  if (type === 'submissions' || type === 'mysubmissions') {
    // check if params has submission id
    if (query.id.length === 3) {
      submissionID = Number(query.id[2])
    }
  }

  return isFallback ? null : (
    <Layout task={task} type={type}>
      <RightDisplay
        task={task}
        submissionID={submissionID}
        solution={solution}
        type={type}
      />
    </Layout>
  )
}

export default Tasks

export const getStaticPaths: GetStaticPaths = async () => {
  const tasks = await prisma.task.findMany()

  const paths = tasks.map(task => ({
    params: { id: [task.id] }
  }))

  return {
    paths: tasks.reduce((acc, task) => {
      return [
        ...acc,
        { params: { id: [task.id] } },
        { params: { id: [task.id, 'submissions'] } },
        { params: { id: [task.id, 'submit'] } },
        { params: { id: [task.id, 'solution'] } }
      ]
    }, []),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const task: Task = await prisma.task.findUnique({
    where: { id: `${params.id[0]}` }
  })

  let type = params.id.length === 1 ? 'statement' : params.id[1]
  let solution = null

  if (type === 'solution') {
    const solutionRes = await fetch(
      `${process.env.NEXT_PUBLIC_AWS_URL}/solutions/md/${params.id[0]}.md`
    )

    if (solutionRes.status === 200) {
      const raw = await solutionRes.text()
      solution = await mdxToHtml(raw)
    }
  }

  return {
    props: {
      solution,
      task,
      type: type as string
    }
  }
}

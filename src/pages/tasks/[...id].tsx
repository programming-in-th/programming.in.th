import { ParsedUrlQuery } from 'querystring'

import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'

import { useRouter } from 'next/router'

import { TaskContent } from '@/components/Task/Content'
import { TaskLayout } from '@/components/Task/Layout'
import prisma from '@/lib/prisma'
import { mdxToHtml } from '@/lib/renderMarkdown'

const Tasks = ({
  task,
  type,
  solution
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback, query } = useRouter()
  let submissionID: null | number = null

  if (
    query !== undefined &&
    (type === 'submissions' || type === 'mysubmissions')
  ) {
    // check if params has submission id
    const { id } = query
    if (!id || typeof id === 'string') {
      return null
    }
    if (id.length === 3) {
      submissionID = Number(id[2])
    }
  }

  return isFallback ? null : (
    <TaskLayout task={task} type={type}>
      <TaskContent
        task={task}
        submissionID={submissionID}
        solution={solution}
        type={type}
      />
    </TaskLayout>
  )
}

export default Tasks

export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return { paths: [], fallback: 'blocking' }
  }

  const tasks = await prisma.task.findMany({ where: { private: false } })

  const paths = tasks.reduce((acc: { params: ParsedUrlQuery }[], task) => {
    return [
      ...acc,
      { params: { id: [task.id] } },
      { params: { id: [task.id, 'submissions'] } },
      { params: { id: [task.id, 'submit'] } },
      { params: { id: [task.id, 'solution'] } }
    ]
  }, [])

  return {
    paths: paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params!
  if (typeof id === 'string' || !id) {
    return {
      notFound: true
    }
  }
  const task = await prisma.task.findFirst({
    where: { id: `${id[0]}`, private: false }
  })

  if (task === null) {
    return {
      notFound: true
    }
  }

  let type = id.length === 1 ? 'statement' : id[1]
  let solution = null

  if (type === 'solution') {
    const solutionRes = await fetch(
      `${process.env.NEXT_PUBLIC_AWS_URL}/solutions/md/${id[0]}.md`
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
      type: type
    }
  }
}

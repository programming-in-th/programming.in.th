import { Fragment, useCallback, useMemo } from 'react'
import Router, { useRouter } from 'next/router'

import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'

import prisma from '@/lib/prisma'
import { PageLayout } from '@/components/Layout'
import { LeftBar } from '@/components/ViewTask/LeftBar'
import { RightDisplay } from '@/components/ViewTask/RightDisplay'
import { Tab } from '@headlessui/react'
import { Task } from '@prisma/client'
import { mdxToHtml } from '@/lib/renderMarkdown'

const Tabs = ['statement', 'submit', 'submissions', 'mysubmissions', 'solution']

const Tasks = ({
  task,
  type,
  solution
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback, query } = useRouter()
  let submissionID: null | string = null

  if (type === 'submissions' || type === 'mysubmissions') {
    // check if params has submission id
    if (query.id.length === 3) {
      submissionID = query.id[2]
    }
  }

  return isFallback ? null : (
    <PageLayout>
      <div className="relative flex min-h-screen gap-12 pt-8 mx-auto text-prog-gray-500 pb-14">
        <LeftBar task={task} type={type} />
        <RightDisplay
          task={task}
          submissionID={submissionID}
          solution={solution}
          type={type}
        />
      </div>
    </PageLayout>
  )
}

export default Tasks

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }

  // const tasks = await prisma.task.findMany()

  // const paths = tasks.map(task => ({
  //   params: { id: task.id }
  // }))

  // return {
  //   paths,
  //   fallback: true
  // }
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

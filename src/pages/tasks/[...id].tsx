import { Fragment, useCallback } from 'react'
import { useRouter } from 'next/router'

import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'

import prisma from '@/lib/prisma'
import { PageLayout } from '@/components/Layout'
import { LeftBar } from '@/components/ViewTask/LeftBar'
import { RightDisplay } from '@/components/ViewTask/RightDisplay'
import { Tab } from '@headlessui/react'
import { Task } from '@prisma/client'

const Tabs = ['statement', 'submit', 'submissions', 'mysubmissions', 'solution']

const Tasks = ({
  task,
  type,
  submissionID
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback, query, replace } = useRouter()

  const onTabChange = useCallback(
    (index: number) => {
      // replace({ query: { ...query, type: Tabs[index] } }, null, {
      replace({ query: { ...query, id: [task.id, Tabs[index]] } }, null, {
        shallow: true
      })
    },
    [query]
  )

  return isFallback ? null : (
    <PageLayout>
      <div className="relative flex min-h-screen pt-8 text-prog-gray-500 gap-12 pb-14 mx-auto">
        <Tab.Group
          defaultIndex={
            Tabs.includes(type as string) ? Tabs.findIndex(v => v === type) : 0
          }
          onChange={onTabChange}
          as={Fragment}
        >
          <LeftBar task={task} />
          <RightDisplay task={task} submissionID={submissionID} />
        </Tab.Group>
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
  const task = await prisma.task.findUnique({
    where: { id: `${params.id[0]}` }
  })

  let type = params.id.length === 1 ? 'statement' : params.id[1]
  let submissionID: null | string = null

  if (type === 'submissions' || type === 'mysubmissions') {
    // check if params has submission id
    if (params.id.length === 3) {
      submissionID = params.id[2]
    }
  }

  return {
    props: {
      task: task as Task,
      type: type as string,
      submissionID
    }
  }
}

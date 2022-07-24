import { useCallback } from 'react'
import { useRouter } from 'next/router'

import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'

import prisma from '@/lib/prisma'
import { PageLayout } from '@/components/Layout'
import { LeftBar } from '@/components/ViewTask/LeftBar'
import { RightDisplay } from '@/components/ViewTask/RightDisplay'
import { Tab } from '@headlessui/react'

const Tabs = ['statement', 'submit', 'submissions', 'mysubmissions', 'solution']

const Tasks = ({ task }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback, query, replace } = useRouter()

  const onTabChange = useCallback((index: number) => {
    replace({ query: { ...query, type: Tabs[index] } }, null, {
      shallow: true
    })
  }, [])

  return isFallback ? null : (
    <PageLayout>
      <div className="relative flex min-h-screen pt-4 text-prog-gray-500 gap-12 pb-14 w-full md:w-[55rem] xl:w-[72rem] mx-auto">
        <Tab.Group
          defaultIndex={
            Tabs.includes(query?.type as string)
              ? Tabs.findIndex(v => v === query?.type)
              : 0
          }
          onChange={onTabChange}
        >
          <LeftBar task={task} />
          <RightDisplay task={task} />
        </Tab.Group>
      </div>
    </PageLayout>
  )
}

export default Tasks

export const getStaticPaths: GetStaticPaths = async () => {
  const tasks = await prisma.task.findMany()

  const paths = tasks.map(task => ({
    params: { id: task.id }
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const task = await prisma.task.findUnique({
    where: { id: `${params.id}` }
  })

  return {
    props: {
      task
    }
  }
}

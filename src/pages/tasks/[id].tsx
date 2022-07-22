import React from 'react'
import { useRouter } from 'next/router'

import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'

import prisma from '@/lib/prisma'
import { PageLayout } from '@/components/Layout'
import { LeftBar } from '@/components/ViewTask/LeftBar'
import { RightDisplay } from '@/components/ViewTask/RightDisplay'

const Tasks = ({ task }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()

  return router.isFallback ? null : (
    <PageLayout>
      <div className="relative flex min-h-screen pt-12 text-prog-gray-500 gap-12 pb-14 w-full md:w-[55rem] xl:w-[72rem] mx-auto">
        <LeftBar task={task} />
        <RightDisplay />
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

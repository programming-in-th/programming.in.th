import React from 'react'
import { useRouter } from 'next/router'

import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'

import prisma from '@/lib/prisma'

const Tasks = ({ task }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()

  return router.isFallback ? null : <p>{task.id}</p>
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

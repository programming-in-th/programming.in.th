import { cache } from 'react'

import { Metadata } from 'next'

import { TaskContent } from '@/components/Task/Content'
import { TaskLayout } from '@/components/Task/Layout'
import { getTask } from '@/lib/api/queries/getTask'

const fetchTask = cache(async ({ params }: { params: { id: string[] } }) => {
  const id = params.id
  const { solution, task, type } = await getTask(id[0], id[1])
  return { solution, task, type }
})

export async function generateMetadata({
  params
}: {
  params: { id: string[] }
}): Promise<Metadata> {
  const { task } = await fetchTask({ params })
  return {
    title: `${task.title} | programming.in.th`
  }
}

export default async function Tasks({ params }: { params: { id: string[] } }) {
  const { solution, task, type } = await fetchTask({ params })
  return (
    <TaskLayout task={task} type={type}>
      <TaskContent task={task} solution={solution} type={type} />
    </TaskLayout>
  )
}

import { TaskContent } from '@/components/Task/Content'

import { getTask } from '../../getTask'
import { TaskLayout } from '../../TaskLayout'

export default async function Tasks({ params }: { params: { id: string[] } }) {
  const id = params.id
  const { solution, task, type } = await getTask(id[0], id[1])

  return (
    <TaskLayout task={task} type={type}>
      <TaskContent task={task} solution={solution} type={type} />
    </TaskLayout>
  )
}

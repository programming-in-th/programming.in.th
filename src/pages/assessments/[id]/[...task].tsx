import { useRouter } from 'next/router'

import { Task } from '@prisma/client'
import useSWR from 'swr'

import { Loading } from '@/components/Loading'
import { TaskLayout } from '@/components/Task/Layout'
import StatementTab from '@/components/Task/Tabs/Statement'
import SubmissionsTab from '@/components/Task/Tabs/Submissions'
import SubmitTab from '@/components/Task/Tabs/Submit'
import fetcher from '@/lib/fetcher'

const component = (type: string, task: Task) => {
  switch (type) {
    case 'statement':
      return <StatementTab task={task} />
    case 'submit':
      return <SubmitTab task={task} />
    case 'submissions':
      return <SubmissionsTab task={task} />
  }
}

const Task = () => {
  const router = useRouter()
  const assessmentId = router.query.id as string
  const taskPath = router.query.task as string[]

  const taskId = taskPath && taskPath[0]
  const type = taskPath && (taskPath.length === 1 ? 'statement' : taskPath[1])

  console.log(taskId)
  const { data: task } = useSWR<Task>(`/api/tasks/${taskId}`, fetcher)
  console.log(task)
  return (
    <>
      {task ? (
        <TaskLayout task={task} type={type} assessmentId={assessmentId}>
          <div className="flex w-full min-w-0 shrink flex-col gap-8">
            {component(type, task)}
          </div>
        </TaskLayout>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Task

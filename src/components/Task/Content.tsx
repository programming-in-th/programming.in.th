import 'server-only'

import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { TaskModel } from '@/prisma/models'

import SolutionTab from './Tabs/Solution'
import StatementTab from './Tabs/Statement'
import SubmissionsTab from './Tabs/Submissions'
import SubmitTab from './Tabs/Submit'

const component = (
  type: string,
  task: TaskModel,
  solution: MDXRemoteSerializeResult | null,
  assessmentId?: string
) => {
  switch (type) {
    case 'statement':
      return <StatementTab task={task} />
    case 'submit':
      return <SubmitTab task={task} assessmentId={assessmentId} />
    case 'submissions':
      return <SubmissionsTab task={task} assessmentId={assessmentId} />
    case 'my-submissions':
      return <SubmissionsTab task={task} assessmentId={assessmentId} own />
    case 'solution':
      return <SolutionTab taskId={task.id} solution={solution} />
  }
}

export const TaskContent = ({
  task,
  type,
  solution,
  assessmentId
}: {
  task: TaskModel
  type: string
  solution: MDXRemoteSerializeResult | null
  assessmentId?: string
}) => {
  return (
    <div className="flex w-full min-w-0 shrink flex-col gap-8">
      {component(type, task, solution, assessmentId)}
    </div>
  )
}

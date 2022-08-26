import { Task } from '@prisma/client'

import { PageLayout } from '@/components/Layout'
import { SideBar } from '@/components/Task/SideBar'

export const TaskLayout = ({
  task,
  type,
  children,
  isAssessment = false
}: {
  task: Task
  type: string
  children: JSX.Element
  isAssessment?: boolean
}) => (
  <PageLayout>
    <div className="align-center flex h-full w-screen justify-center px-4 py-8">
      <div className="flex h-full w-full max-w-6xl flex-col gap-2 md:flex-row md:gap-8">
        <SideBar task={task} type={type} isAssessment={isAssessment} />
        {children}
      </div>
    </div>
  </PageLayout>
)

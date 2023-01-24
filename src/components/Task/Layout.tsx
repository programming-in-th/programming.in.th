import { Task } from '@prisma/client'

import { PageLayout } from '@/components/Layout'
import { SideBar } from '@/components/Task/SideBar'
import { Title } from '@/components/Task/Title'

export const TaskLayout = ({
  task,
  type,
  children,
  assessmentId
}: {
  task: Task
  type: string
  children: JSX.Element
  assessmentId?: string
}) => (
  <PageLayout>
    <div>
      <div className="align-center flex h-full w-screen justify-center px-4 pt-4">
        <div className="flex h-full w-full max-w-6xl flex-col gap-2 md:flex-row md:gap-8">
          <Title task={task} assessmentId={assessmentId} />
        </div>
      </div>
      <div className="align-center flex h-full w-screen justify-center px-4 py-4">
        <div className="flex h-full w-full max-w-6xl flex-col gap-2 md:flex-row md:gap-8">
          <SideBar task={task} type={type} assessmentId={assessmentId} />
          {children}
        </div>
      </div>
    </div>
  </PageLayout>
)

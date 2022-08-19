import { PageLayout } from '@/components/Layout'
import { SideBar } from '@/components/Task/SideBar'

export const TaskLayout = ({ task, type, children }) => (
  <PageLayout>
    <div className="align-center flex h-full w-screen justify-center px-4 py-8">
      <div className="flex h-full w-full max-w-6xl flex-col gap-2 md:flex-row md:gap-8">
        <SideBar task={task} type={type} />
        {children}
      </div>
    </div>
  </PageLayout>
)

import { PageLayout } from '@/components/Layout'
import { LeftBar } from '@/components/Task/LeftBar'

export const Layout = ({ task, type, children }) => (
  <PageLayout>
    <div className="align-center flex h-full w-screen justify-center px-4 py-8">
      <div className="flex h-full w-full max-w-6xl flex-col gap-8 md:flex-row">
        <LeftBar task={task} type={type} />
        {children}
      </div>
    </div>
  </PageLayout>
)

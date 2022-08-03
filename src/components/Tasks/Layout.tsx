import { PageLayout } from '@/components/Layout'
import { LeftBar } from '@/components/ViewTask/LeftBar'

export const Layout = ({ task, type, children }) => (
  <PageLayout>
    <div className="relative mx-auto flex min-h-screen gap-12 pt-8 pb-14 text-prog-gray-500">
      <LeftBar task={task} type={type} />
      {children}
    </div>
  </PageLayout>
)

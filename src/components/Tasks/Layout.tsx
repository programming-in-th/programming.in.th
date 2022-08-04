import { PageLayout } from '@/components/Layout'
import { LeftBar } from '@/components/Task/LeftBar'

export const Layout = ({ task, type, children }) => (
  <PageLayout>
    <div className="align-center flex w-screen justify-center px-4 py-8">
      <div className="flex w-full max-w-6xl gap-8">
        {/* <div className="relative mx-auto flex min-h-screen gap-12 pt-8 pb-14 text-prog-gray-500"> */}
        <LeftBar task={task} type={type} />
        {children}
      </div>
    </div>
  </PageLayout>
)

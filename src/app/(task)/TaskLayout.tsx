import { ReactNode } from 'react'

import { Task } from '@prisma/client'

import { Title } from '@/components/Task/Title'

import { SideBar } from './Sidebar'

export function TaskLayout({
  task,
  type,
  children
}: {
  task: Task
  type: string
  children: ReactNode
}) {
  return (
    <div className="align-center flex h-full w-screen justify-center px-4 py-4">
      <div className="flex h-full w-full max-w-6xl flex-col gap-2 md:flex-row md:gap-8">
        <div className="flex flex-col gap-4 md:w-[18rem]">
          <Title task={task} />
          <SideBar task={task} type={type} />
        </div>
        {children}
      </div>
    </div>
  )
}

import { FC, Fragment } from 'react'
import { Tab } from '@headlessui/react'
import StatementTab from './Tabs/StatementTab'
import SubmitTab from './Tabs/SubmitTab'
import MySubmissionsTab from './Tabs/MySubmissionsTab'
import SubmissionsTab from './Tabs/SubmissionsTab'
import SolutionTab from './Tabs/SolutionTab'
import { Task } from '@prisma/client'

export const RightDisplay: FC<{ task: Task }> = ({ task }) => {
  return (
    <div className="w-full flex flex-col gap-8">
      <Tab.Panels as={Fragment}>
        <Tab.Panel>
          <StatementTab task={task} />
        </Tab.Panel>
        <Tab.Panel>
          <SubmitTab task={task} />
        </Tab.Panel>
        <Tab.Panel>
          <SubmissionsTab task={task} />
        </Tab.Panel>
        <Tab.Panel>
          <MySubmissionsTab task={task} />
        </Tab.Panel>
        <Tab.Panel>
          <SolutionTab task={task} />
        </Tab.Panel>
      </Tab.Panels>
    </div>
  )
}

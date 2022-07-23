import { FC, Fragment } from 'react'
import { Tab } from '@headlessui/react'
import StatementTab from './Tabs/StatementTab'
import MySubmissionsTab from './Tabs/MySubmissionsTab'
import SubmissionsTab from './Tabs/SubmissionsTab'
import SolutionTab from './Tabs/SolutionTab'

export const RightDisplay: FC = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      <Tab.Panels as={Fragment}>
        <Tab.Panel as={Fragment}>
          <StatementTab />
        </Tab.Panel>
        <Tab.Panel as={Fragment}>
          <SubmissionsTab />
        </Tab.Panel>
        <Tab.Panel as={Fragment}>
          <MySubmissionsTab />
        </Tab.Panel>
        <Tab.Panel as={Fragment}>
          <SolutionTab />
        </Tab.Panel>
      </Tab.Panels>
    </div>
  )
}

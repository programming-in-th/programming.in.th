import { FC, Fragment } from 'react'
import { Tab } from '@headlessui/react'
import StatementTab from './Tabs/StatementTab'
import SubmitTab from './Tabs/SubmitTab'
import MySubmissionsTab from './Tabs/MySubmissionsTab'
import ViewSubmissionTab from './Tabs/ViewSubmissionTab'
import SubmissionsTab from './Tabs/SubmissionsTab'
import SolutionTab from './Tabs/SolutionTab'
import { Task } from '@prisma/client'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export const RightDisplay: FC<{
  task: Task
  submissionID: null | string
  solution: MDXRemoteSerializeResult
}> = ({ task, submissionID, solution }) => {
  return (
    <Tab.Panels className="w-full md:w-[28rem] xl:w-[55rem] flex flex-col gap-8">
      <Tab.Panel>
        <StatementTab task={task} />
      </Tab.Panel>
      <Tab.Panel>
        <SubmitTab task={task} />
      </Tab.Panel>
      <Tab.Panel>
        <SubmissionsTab task={task} submissionID={submissionID} />
      </Tab.Panel>
      <Tab.Panel>
        <MySubmissionsTab task={task} submissionID={submissionID} />
      </Tab.Panel>
      <Tab.Panel>
        <SolutionTab solution={solution} />
      </Tab.Panel>
    </Tab.Panels>
  )
}

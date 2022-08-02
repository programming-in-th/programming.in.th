import { FC, Fragment, useCallback, useMemo } from 'react'
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
  type: string
}> = ({ task, submissionID, solution, type }) => {
  let component = () => {
    switch (type) {
      case 'statement':
        return <StatementTab task={task} />
      case 'submit':
        return <SubmitTab task={task} />
      case 'submissions':
        return <SubmissionsTab task={task} submissionID={submissionID} />
      case 'mySubmissions':
        return <MySubmissionsTab task={task} submissionID={submissionID} />
      case 'solution':
        return <SolutionTab solution={solution} />
    }
  }

  return (
    <div className="w-full md:w-[28rem] xl:w-[55rem] flex flex-col gap-8">
      {component()}
    </div>
  )
}

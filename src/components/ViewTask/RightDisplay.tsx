import { FC, Fragment, useCallback, useMemo } from 'react'

import { Tab } from '@headlessui/react'
import { Task } from '@prisma/client'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import MySubmissionsTab from './Tabs/MySubmissionsTab'
import SolutionTab from './Tabs/SolutionTab'
import StatementTab from './Tabs/StatementTab'
import SubmissionsTab from './Tabs/SubmissionsTab'
import SubmitTab from './Tabs/SubmitTab'
import ViewSubmissionTab from './Tabs/ViewSubmissionTab'

export const RightDisplay: FC<{
  task: Task
  submissionID: null | number
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
    <div className="flex w-full flex-col gap-8 md:w-[28rem] xl:w-[55rem]">
      {component()}
    </div>
  )
}

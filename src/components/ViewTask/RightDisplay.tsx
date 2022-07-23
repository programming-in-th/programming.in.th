import { FC, Fragment } from 'react'
import PDFViewer from './Elements/PDFViewer'
import { SubmitElement } from './Elements/SubmitElement'
import { Tab } from '@headlessui/react'

// const pdfURL = `${config.awsURL}/statements/${metadata.id}.pdf`
const pdfURL = `/assets/placeholder/statement.pdf`

const StatementTab: FC = () => {
  return (
    <>
      <article className="h-96">
        <PDFViewer fileUrl={pdfURL} keywords={[]} />
      </article>

      <SubmitElement />
    </>
  )
}

const SubmissionsTab: FC = () => {
  return (
    <>
      <h2 className="text-prog-gray-500 font-light text-lg">Submissions</h2>
    </>
  )
}

const MySubmissionsTab: FC = () => {
  return (
    <>
      <h2 className="text-prog-gray-500 font-light text-lg">My Submissions</h2>
    </>
  )
}

const SolutionTab: FC = () => {
  return (
    <>
      <h2 className="text-prog-gray-500 font-light text-lg">Solution</h2>
    </>
  )
}

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

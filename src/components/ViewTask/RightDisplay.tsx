import { TTabType } from './lib/types'
import { FC } from 'react'
import PDFViewer from './Elements/PDFViewer'
import { SubmitElement } from './Elements/SubmitElement'

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

export const RightDisplay: FC<{ tab: TTabType }> = props => {
  const { tab } = props

  return (
    <div className="w-full flex flex-col gap-8">
      {/* add tab change animation */}
      {tab === 'statement' && <StatementTab />}
    </div>
  )
}

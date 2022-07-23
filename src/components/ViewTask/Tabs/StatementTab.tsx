import { FC, memo } from 'react'
import PDFViewer from '../Elements/PDFViewer'
import { SubmitElement } from '../Elements/SubmitElement'

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

export default StatementTab

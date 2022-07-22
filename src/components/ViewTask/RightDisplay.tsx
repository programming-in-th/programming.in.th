import { FC } from 'react'
import PDFViewer from './Elements/PDFViewer'
import { SubmitElement } from './Elements/SubmitElement'

// const pdfURL = `${config.awsURL}/statements/${metadata.id}.pdf`
const pdfURL = `/assets/placeholder/statement.pdf`

export const RightDisplay: FC = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      <article className="h-96">
        <PDFViewer fileUrl={pdfURL} keywords={[]} />
      </article>

      <SubmitElement />
    </div>
  )
}

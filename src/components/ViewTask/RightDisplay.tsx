import { FC, ObjectHTMLAttributes } from 'react'
import PDFViewer from './Elements/PDFViewer'

// const pdfURL = `${config.awsURL}/statements/${metadata.id}.pdf`
const pdfURL = `/assets/placeholder/statement.pdf`

export const RightDisplay: FC = () => {
  return (
    <div className="w-full">
      <article className="h-96">
        <PDFViewer fileUrl={pdfURL} keywords={[]} />
      </article>
    </div>
  )
}

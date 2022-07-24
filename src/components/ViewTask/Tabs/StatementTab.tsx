import { Task } from '@/types/tasks'
import { FC, memo } from 'react'
import PDFViewer from '../Elements/PDFViewer'

// const pdfURL = `${config.awsURL}/statements/${metadata.id}.pdf`
const pdfURL = `/assets/placeholder/statement.pdf`

const StatementTab: FC<{ task: Task }> = ({ task }) => {
  return (
    <div className="">
      <article className="h-screen">
        <PDFViewer fileUrl={pdfURL} keywords={[]} />
      </article>
    </div>
  )
}

export default StatementTab

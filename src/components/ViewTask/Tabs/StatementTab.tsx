import { Task } from '@prisma/client'
import { FC, memo } from 'react'
import PDFViewer from '../Elements/PDFViewer'

const StatementTab: FC<{ task: Task }> = ({ task }) => {
  const pdfURL = `${process.env.NEXT_PUBLIC_AWS_URL}/statements/pdf/${task.id}.pdf`

  return (
    <div className="">
      <article className="h-screen">
        <PDFViewer fileUrl={pdfURL} keywords={[]} />
      </article>
    </div>
  )
}

export default StatementTab

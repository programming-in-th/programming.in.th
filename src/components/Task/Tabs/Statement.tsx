import { Task } from '@prisma/client'

import PDFViewer from '../PDFViewer'

const StatementTab = ({ task }: { task: Task }) => {
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

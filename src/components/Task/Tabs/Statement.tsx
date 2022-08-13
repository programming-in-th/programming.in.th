import { Task } from '@prisma/client'

const StatementTab = ({ task }: { task: Task }) => {
  const pdfURL = `${process.env.NEXT_PUBLIC_AWS_URL}/statements/pdf/${task.id}.pdf`

  return (
    <article className="h-screen">
      <object data={pdfURL} type="application/pdf" width="100%" height="100%">
        <p>
          Your web browser doesn&apos;t have a PDF plugin. Instead you can{' '}
          <a href={pdfURL}>click here to download the PDF file.</a>
        </p>
      </object>
    </article>
  )
}

export default StatementTab

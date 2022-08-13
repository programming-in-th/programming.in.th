import { Task } from '@prisma/client'

const StatementTab = ({ task }: { task: Task }) => {
  const encoded = encodeURIComponent(
    `${process.env.NEXT_PUBLIC_AWS_URL}/statements/pdf/${task.id}.pdf`
  )
  const pdfURL = `https://drive.google.com/viewerng/viewer?embedded=true&url=${encoded}`

  return (
    <article className="h-screen">
      <iframe src={pdfURL} width="100%" height="100%">
        <p>
          Your web browser doesn&apos;t have a PDF plugin. Instead you can{' '}
          <a href={pdfURL}>click here to download the PDF file.</a>
        </p>
      </iframe>
    </article>
  )
}

export default StatementTab

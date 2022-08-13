import { Task } from '@prisma/client'

const StatementTab = ({ task }: { task: Task }) => {
  const pdfURL = `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(
    `${process.env.NEXT_PUBLIC_AWS_URL}/statements/pdf/${task.id}.pdf`
  )}`

  return (
    <article className="h-screen">
      <iframe src={pdfURL} width="100%" height="100%" />
    </article>
  )
}

export default StatementTab

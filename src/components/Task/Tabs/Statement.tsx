import { Task } from '@prisma/client'

const StatementTab = ({ task }: { task: Task }) => {
  const src = `/api/pdf/${task.id}`
  return (
    <article className="h-screen">
      <embed src={src} width="100%" height="100%" />
    </article>
  )
}

export default StatementTab

import { IGeneralTask } from '@/types/tasks'

export default function TaskList({ tasks }: { tasks: IGeneralTask[] }) {
  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  )
}

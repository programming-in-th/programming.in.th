import { useRouter } from 'next/router'

const Task = () => {
  const router = useRouter()
  const id = router.query.id as string
  const task = router.query.task
  console.log(id, task)
  return <div>{`${id}-${task}`}</div>
}

export default Task

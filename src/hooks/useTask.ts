import { Task } from '@/types/tasks'
import { useState } from 'react'

export const useTask = () => {
  const [task, setTask] = useState<Task>()

  // task

  // task state

  return {
    task
  }
}

import React from 'react'

interface ITaskProps {
  name?: string
  description?: string
  timeLimit?: number
  memoryLimit?: string
}

export const Task: React.FunctionComponent<ITaskProps> = props => {
  return <h1>Hi</h1>
}

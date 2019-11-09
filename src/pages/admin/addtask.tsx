import React, { useState } from 'react'
import { Button, Input } from 'antd'
import { AdminLayout } from '../../components/admin/AdminLayout'
import styled from 'styled-components'
import firebase from '../../lib/firebase'

const InlineWrapper = styled.div`
  display: inline;
  margin: 10px;
`

interface Item {
  name: string
  update: (val: any) => void
}

interface Submit {
  difficulty: number
  memory_limit: number
  title: string
  time_limit: number
  url: string
  source: string
  problem_id: string
  tag: Array<string>
}
const LineItem = (props: Item) => {
  return (
    <InlineWrapper>
      <p>{props.name}</p>
      <Input
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          props.update(e.currentTarget.value)
        }}
        placeholder={`${props.name}`}
      />
    </InlineWrapper>
  )
}

export default () => {
  const addTask = async () => {
    const data: Submit = {
      difficulty: Number(diff),
      memory_limit: Number(memory),
      title: name,
      time_limit: Number(time),
      url: url,
      source: source,
      problem_id: id,
      tag: tag.split(',')
    }
    console.log(data)
    console.log(typeof data.difficulty)
    console.log(typeof diff)
    const response = await firebase
      .app()
      .functions('asia-east2')
      .httpsCallable('addTask')(data)
    console.log(response)
  }
  const [name, setName] = useState<string>('')
  const [diff, setDiff] = useState<number>(0)
  const [memory, setMem] = useState<number>(0)
  const [time, setTime] = useState<number>(0)
  const [tag, setTag] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [source, setSource] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  return (
    <AdminLayout>
      <h1>ADD TASK</h1>
      <LineItem name="Problem id" update={setId} />
      <LineItem name="Task name" update={setName} />
      <LineItem name="Time limit" update={setTime} />
      <LineItem name="Memory limit" update={setMem} />
      <LineItem name="Difficulty" update={setDiff} />
      <LineItem name="Tag" update={setTag} />
      <LineItem name="URL" update={setUrl} />
      <LineItem name="Source" update={setSource} />
      <Button onClick={addTask} type="primary">
        Finish Add Task
      </Button>
    </AdminLayout>
  )
}

import React, { useState } from 'react'
import { Button, Input, Form, Icon } from 'antd'
import { AdminLayout } from '../../components/admin/AdminLayout'
import styled from 'styled-components'
import firebase from '../../lib/firebase'

interface Item {
  name: string
  holder: string
  update: (val: any) => void
}

const ButtonWrapper = styled.div`
  text-align: center;
`

interface Submit {
  difficulty: number
  memory_limit: number
  title: string
  time_limit: number
  url: string
  source: string
  problem_id: string
  tags: Array<string>
}

const LineItem = (props: Item) => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 }
  }
  return (
    <Form layout="horizontal">
      <Form.Item label={`${props.name}`} {...formItemLayout}>
        <Input
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            props.update(e.currentTarget.value)
          }}
          placeholder={`${props.holder}`}
        />
      </Form.Item>
    </Form>
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
      tags: tag.split(',')
    }
    const response = await firebase
      .app()
      .functions('asia-east2')
      .httpsCallable('addTask')(data)
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
      <LineItem name="Problem id" holder="Problem id" update={setId} />
      <LineItem name="Task name" holder="Task name" update={setName} />
      <LineItem name="Time limit" holder="Time limit" update={setTime} />
      <LineItem name="Memory limit" holder="Memory limit" update={setMem} />
      <LineItem name="Difficulty" holder="Difficulty" update={setDiff} />
      <LineItem
        name="Tags"
        holder="Each tag should be separated by ',' and no space allowed"
        update={setTag}
      />
      <LineItem name="URL" holder="URL" update={setUrl} />
      <LineItem name="Source" holder="Source" update={setSource} />
      <Form layout="horizontal">
        <ButtonWrapper>
          <Button onClick={addTask} type="primary">
            Finish Adding Task
          </Button>
        </ButtonWrapper>
      </Form>
    </AdminLayout>
  )
}

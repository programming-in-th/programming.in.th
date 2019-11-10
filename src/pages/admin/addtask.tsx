import React, { useState } from 'react'
import { Button, Input, Form, Icon } from 'antd'
import { AdminLayout } from '../../components/admin/AdminLayout'
import styled from 'styled-components'
import firebase from '../../lib/firebase'
import { FormComponentProps } from 'antd/lib/form'
import { openNotificationWithIcon } from '../../components/Notification'

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

function hasErrors(fieldsError: Record<string, string[] | undefined>) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

const AddTaskForm: React.FC<FormComponentProps> = (
  props: FormComponentProps
) => {
  const {
    form: { getFieldDecorator, getFieldsError }
  } = props

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    props.form.validateFields(async (err, values) => {
      if (isNaN(values.difficulty)) {
        openNotificationWithIcon(
          'error',
          'An error occured',
          'Difficulty is not a number!'
        )
      }
      if (isNaN(values.timeLimit)) {
        openNotificationWithIcon(
          'error',
          'An error occured',
          'Time limit is not a number!'
        )
      }
      if (isNaN(values.memoryLimit)) {
        openNotificationWithIcon(
          'error',
          'An error occured',
          'Memory limit is not a number!'
        )
      } else if (!err) {
        const data: Submit = {
          problem_id: values.problemID,
          title: values.title,
          difficulty: Number(values.difficulty),
          time_limit: Number(values.timeLimit),
          memory_limit: Number(values.memoryLimit),
          url: values.url,
          source: values.source,
          tags: values.tags.split(',')
        }
        props.form.resetFields()
        await firebase
          .app()
          .functions('asia-east2')
          .httpsCallable('addTask')(data)
        openNotificationWithIcon(
          'success',
          'Success!',
          'New task has been Added!'
        )
      } else {
        openNotificationWithIcon(
          'error',
          'An error occured',
          "You can't add new task now!"
        )
      }
    })
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 }
    }
  }

  const formButtonLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14, offset: 4 }
    }
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Form.Item label="Problem id" {...formItemLayout}>
        {getFieldDecorator('problemID', {
          rules: [
            {
              required: true,
              message: 'Problem id is required.'
            }
          ]
        })(
          <Input
            prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Problem id"
          />
        )}
      </Form.Item>
      <Form.Item label="Title" {...formItemLayout}>
        {getFieldDecorator('title', {
          rules: [
            {
              required: true,
              message: 'Title is required.'
            }
          ]
        })(
          <Input
            prefix={
              <Icon type="font-colors" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            placeholder="Title"
          />
        )}
      </Form.Item>
      <Form.Item label="Difficulty" {...formItemLayout}>
        {getFieldDecorator('difficulty', {
          rules: [
            {
              required: true,
              message: 'Difficulty is required.(1-10)'
            }
          ]
        })(
          <Input
            prefix={<Icon type="rise" style={{ color: 'rgba(0,0,0,.25)' }} />}
            min={1}
            max={100000}
            placeholder="Difficulty(1-10)"
          />
        )}
      </Form.Item>
      <Form.Item label="Time limit" {...formItemLayout}>
        {getFieldDecorator('timeLimit', {
          rules: [
            {
              required: true,
              message: 'Time limit is required.'
            }
          ]
        })(
          <Input
            prefix={
              <Icon type="history" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            placeholder="Time limit"
          />
        )}
      </Form.Item>
      <Form.Item label="Memory limit" {...formItemLayout}>
        {getFieldDecorator('memoryLimit', {
          rules: [
            {
              required: true,
              message: 'Memory limit is required.'
            }
          ]
        })(
          <Input
            prefix={
              <Icon type="cluster" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            placeholder="Memory limit"
          />
        )}
      </Form.Item>
      <Form.Item label="Tags" {...formItemLayout}>
        {getFieldDecorator('tags', {
          rules: [
            {
              pattern: /^\w+(?:,\w+)*$/,
              message: "Tag doesn't match required pattern."
            }
          ]
        })(
          <Input
            prefix={<Icon type="tags" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Each tag should be separated with ',' and no space allowed."
          />
        )}
      </Form.Item>
      <Form.Item label="URL" {...formItemLayout}>
        {getFieldDecorator('url', {
          rules: [
            {
              required: true,
              message: 'url is required.',
              type: 'url'
            }
          ]
        })(
          <Input
            prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="URL"
          />
        )}
      </Form.Item>
      <Form.Item label="Source" {...formItemLayout}>
        {getFieldDecorator('source', {
          rules: [
            {
              required: true,
              message: 'source is required.',
              type: 'string'
            }
          ]
        })(
          <Input
            prefix={
              <Icon type="share-alt" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            placeholder="source"
          />
        )}
      </Form.Item>
      <Form.Item {...formButtonLayout}>
        <ButtonWrapper>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Save
          </Button>
        </ButtonWrapper>
      </Form.Item>
    </Form>
  )
}

const TaskForm = Form.create({ name: 'TaskForm' })(AddTaskForm)

export default () => {
  return (
    <AdminLayout>
      <h1>ADD TASK</h1>
      <TaskForm></TaskForm>
    </AdminLayout>
  )
}

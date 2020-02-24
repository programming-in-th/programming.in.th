import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Form, Input, Icon, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { openNotificationWithIcon } from '../Notification'
import { AvatarUploader } from '../upload'

const Avatar = styled.div`
  width: 144px;
  height: 144px;
  margin-bottom: 12px;
  overflow: hidden;
  img {
    width: 100%;
  }
`
const AvatarTitle = styled.p`
  color: black;
`

interface IAvatarViewProps {
  src: string
}

const AvatarView: React.FunctionComponent<IAvatarViewProps> = ({
  src
}: IAvatarViewProps) => (
  <div>
    <AvatarTitle>Avatar:</AvatarTitle>
    <Avatar>
      <img src={src} alt="Avatar"></img>
    </Avatar>
  </div>
)

function hasErrors(fieldsError: Record<string, string[] | undefined>) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

interface IBasicSettingsProps {
  user: firebase.User
}

const Basic: React.FunctionComponent<FormComponentProps &
  IBasicSettingsProps> = (props: FormComponentProps & IBasicSettingsProps) => {
  const {
    user,
    form: { getFieldDecorator, getFieldsError }
  } = props

  useEffect(() => {
    props.form.setFieldsValue({
      displayName: props.user.displayName,
      email: props.user.email
    })
  }, [props.user])

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const { user } = this.props
        let error = false
        user
          .updateProfile({
            displayName: values.displayName
          })
          .catch(() => (error = true))

        user.updateEmail(values.email).catch(() => (error = true))
        if (error) {
          openNotificationWithIcon(
            'error',
            'An error occured',
            "Can't update your profile now!"
          )
        } else {
          openNotificationWithIcon(
            'success',
            'Success!',
            'Your profile has been updated!'
          )
        }
      }
    })
  }

  const getAvatar = () => {
    return props.user?.photoURL as string
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Display Name">
          {getFieldDecorator('displayName', {
            rules: [
              {
                required: true,
                message: 'Please input your Display Name!'
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Display Name"
            />
          )}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your E-mail!' }]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
      <AvatarView src={getAvatar()}></AvatarView>
      <AvatarUploader user={user}></AvatarUploader>
    </div>
  )
}

export const BasicSettings = Form.create({ name: 'basicSettings' })(
  Basic
) as any

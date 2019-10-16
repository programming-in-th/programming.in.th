import React from 'react'
import styled from 'styled-components'
import { Form, Input, Icon, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { openNotificationWithIcon } from '../Notification'

const Title = styled.h1`
  margin-bottom: 12px;
  font-size: 24px;
  line-height: 28px;
`

const Avatar = styled.div`
  width: 144px;
  height: 144px;
  margin-bottom: 12px;
  overflow: hidden;
  img {
    width: 100%;
  }
`
interface IAvatarViewProps {
  src: string
}

const AvatarView: React.FunctionComponent<IAvatarViewProps> = ({
  src
}: IAvatarViewProps) => (
  <div>
    <p>Avatar:</p>
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

export class Basic extends React.Component<
  FormComponentProps & IBasicSettingsProps
> {
  componentDidMount() {
    this.props.form.setFieldsValue({
      displayName: this.props.user.displayName,
      email: this.props.user.email
    })

    this.props.form.validateFields()
  }

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
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

  getAvatar = () => {
    return this.props.user.photoURL as string
  }

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form
    return (
      <div>
        <Title>Basic Settings</Title>
        <Form onSubmit={this.handleSubmit}>
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
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Display Name"
              />
            )}
          </Form.Item>
          <Form.Item label="Email">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your E-mail!' }]
            })(
              <Input
                prefix={
                  <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
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
        <AvatarView src={this.getAvatar()}></AvatarView>
      </div>
    )
  }
}

export const BasicSettings = Form.create({ name: 'basicSettings' })(
  Basic
) as any

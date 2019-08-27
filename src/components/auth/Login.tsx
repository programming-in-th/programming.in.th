import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'

import H from 'history'
import firebase from 'firebase'
import 'firebase/auth'
import styled from 'styled-components'

interface ILoginProps {
  history: H.History
  setState: React.Dispatch<React.SetStateAction<string>>
}

const StyledForm = styled(Form)`
  max-width: 300px;
`

const LoginButton = styled(Button)`
  width: 100%;
`

class Login extends React.Component<ILoginProps & FormComponentProps, {}> {
  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.submitLogin(
          this.props.history,
          values.email,
          values.password,
          values.remember
        )
      }
    })
  }

  submitLogin = async (
    history: H.History,
    email: string,
    pass: string,
    remember: boolean
  ) => {
    try {
      if (remember) {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      }

      return firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then(() => {
          const currentUser = firebase.auth().currentUser
          if (currentUser)
            if (!currentUser.emailVerified) {
              firebase.auth().signOut()
              window.alert('Please Verify Your Email')
            } else history.length > 2 ? history.goBack() : history.replace('/')
        })
        .catch(function(error) {
          console.log(error.message)
        })
    } catch (error) {
      console.log(error.message)
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <LoginButton type="primary" htmlType="submit">
            Log in
          </LoginButton>
          Or <a href="">register now!</a>
        </Form.Item>
      </StyledForm>
    )
  }
}

export const LoginPage = Form.create({ name: 'login' })(Login) as any

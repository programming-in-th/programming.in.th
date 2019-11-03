import React, { useState } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { WithGoogle, WithFacebook, WithGithub } from './OAuth'

import { Form, Icon, Input, Button, Divider } from 'antd'
import styled from 'styled-components'
import { StyledForm, Others } from './Style'

import firebase from '../../lib/firebase'

import { FormComponentProps } from 'antd/lib/form/Form'
import { openNotificationWithIcon } from '../Notification'

const RegisterButton = styled(Button)`
  width: 100%;
`

const RegisterWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Register = (props: FormComponentProps) => {
  const [errorMessage, setErrorMessage] = useState<string>(null)
  const router = useRouter()

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        submitRegister(
          router,
          values.email,
          values.password,
          values.passwordConfirm,
          values.displayName
        )
      }
    })
  }

  const submitRegister = async (
    router: NextRouter,
    email: string,
    pass: string,
    passConfirm: string,
    displayName: string
  ) => {
    if (pass !== passConfirm) {
      setErrorMessage('Password not match')

      return
    }

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        const currentUser = firebase.auth().currentUser
        if (currentUser) {
          currentUser.sendEmailVerification()
          return currentUser.updateProfile({ displayName }).then(() => {
            router.push('/')
            openNotificationWithIcon(
              'success',
              'Registration Success',
              'Please confirm your Email address!'
            )
            firebase.auth().signOut()
          })
        }
      })
      .catch(error => {
        setErrorMessage(error.message)
      })
  }

  const { getFieldDecorator } = props.form

  return (
    <RegisterWrapper>
      <h1>Get Started</h1>
      <StyledForm onSubmit={handleSubmit}>
        <Form.Item>
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
              placeholder="Name"
            />
          )}
        </Form.Item>
        <Form.Item>
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
          {getFieldDecorator('passwordConfirm', {
            rules: [
              {
                required: true,
                message: 'Please input your confirmed Password!'
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Confirm Password"
            />
          )}
          {errorMessage ? <i>{errorMessage}</i> : null}
        </Form.Item>
        <Form.Item>
          <RegisterButton type="primary" htmlType="submit">
            Start coding now!
          </RegisterButton>
        </Form.Item>
      </StyledForm>
      <Others>
        <Divider>Or</Divider>
        Log In with
        <WithGoogle router={router} setError={setErrorMessage}></WithGoogle>
        <WithFacebook router={router} setError={setErrorMessage}></WithFacebook>
        <WithGithub router={router} setError={setErrorMessage}></WithGithub>
      </Others>
    </RegisterWrapper>
  )
}

export const RegisterPage = Form.create({ name: 'register' })(Register)

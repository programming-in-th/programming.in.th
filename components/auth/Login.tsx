import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, NextRouter } from 'next/router'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd'
import styled from 'styled-components'
import { StyledCard, StyledForm, StyledIcon, Others } from './Style'

import firebase from '../../lib/firebase'

import { FormComponentProps } from 'antd/lib/form/Form'

const LoginButton = styled(Button)`
  width: 100%;
`

const Register = styled.div`
  float: right;
  padding: 0px 24px 0px;
`

const Login = (props: FormComponentProps) => {
  const [errorMessage, setErrorMessage] = useState<string>(null)
  const router = useRouter()

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        submitLogin(router, values.email, values.password, values.remember)
      }
    })
  }

  const submitLogin = async (
    router: NextRouter,
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
            } else {
              router.push('/')
            }
        })
        .catch(error => {
          setError(error.message)
        })
    } catch (error) {
      setError(error.message)
    }
  }

  const setError = (msg: string) => {
    setErrorMessage(msg)
  }

  const { getFieldDecorator } = props.form
  return (
    <Row type="flex" align="middle">
      <StyledCard>
        <Col>
          <h1>Login</h1>
          <StyledForm onSubmit={handleSubmit}>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
              {errorMessage ? <p>{errorMessage}</p> : null}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <LoginButton type="primary" htmlType="submit">
                Log in
              </LoginButton>
              <Others>
                Log in with
                <StyledIcon
                  type="google"
                  theme="outlined"
                  onClick={() => loginWithGmail(router, setError)}
                />
                <StyledIcon
                  type="facebook"
                  theme="outlined"
                  onClick={() => loginWithFacebook(router, setError)}
                />
                <StyledIcon
                  type="github"
                  theme="outlined"
                  onClick={() =>
                    loginWithGithub(this.props.history, this.setError)
                  }
                />
                <Register>
                  Or <Link href="/register">register now!</Link>
                </Register>
              </Others>
            </Form.Item>
          </StyledForm>
        </Col>
      </StyledCard>
    </Row>
  )
}

export const LoginPage = Form.create({ name: 'login' })(Login)

const loginWithGmail = async (
  router: NextRouter,
  setError: (msg: string) => void
) => {
  const provider = new firebase.auth.GoogleAuthProvider()
  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        router.push('/')
      })
      .catch((error: any) => {
        const { message } = error
        setError(message)
      })
  } catch (error) {
    const { message } = error
    setError(message)
  }
}

const loginWithFacebook = async (
  router: NextRouter,
  setError: (msg: string) => void
) => {
  const provider = new firebase.auth.FacebookAuthProvider()

  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        router.push('/')
      })
      .catch((error: any) => {
        const { message } = error
        setError(message)
      })
  } catch (error) {
    const { message } = error
    setError(message)
  }
}

const loginWithGithub = async (
  router: NextRouter,
  setError: (msg: string) => void
) => {
  const provider = new firebase.auth.GithubAuthProvider()

  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        router.push('/')
      })
      .catch((error: any) => {
        const { message } = error
        setError(message)
      })
  } catch (error) {
    const { message } = error
    setError(message)
  }
}

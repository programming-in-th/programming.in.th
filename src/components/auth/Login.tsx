import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col, Card } from 'antd'
import styled from 'styled-components'

import firebase from 'firebase'
import 'firebase/auth'

import { FormComponentProps } from 'antd/lib/form/Form'
import H from 'history'

interface ILoginProps {
  history: H.History
  setState: React.Dispatch<React.SetStateAction<string>>
}

const StyledForm = styled(Form)`
  width: 368px;
  margin: 0 auto;
`

const LoginButton = styled(Button)`
  width: 100%;
`

const StyledIcon = styled(Icon)`
  margin-left: 16px;
  color: rgba(0, 0, 0, 0.2);
  font-size: 24px;
  vertical-align: middle;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #188fff;
  }
`

const Register = styled.div`
  float: right;
`

const Others = styled.div`
  margin-top: 24px;
  text-align: left;
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
      <Row type="flex" align="middle">
        <Col span={12}>
          <h1>Login</h1>
          <StyledForm onSubmit={this.handleSubmit}>
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
                  onClick={() => loginWithGmail(this.props.history)}
                />
                <StyledIcon
                  type="facebook"
                  theme="outlined"
                  onClick={() => loginWithFacebook(this.props.history)}
                />
                <StyledIcon
                  type="github"
                  theme="outlined"
                  onClick={() => loginWithGithub(this.props.history)}
                />
                <Register>
                  Or{' '}
                  <a
                    href="/login"
                    onClick={() => this.props.setState('register')}
                  >
                    register now!
                  </a>
                </Register>
              </Others>
            </Form.Item>
          </StyledForm>
        </Col>
      </Row>
    )
  }
}

export const LoginPage = Form.create({ name: 'login' })(Login) as any

const loginWithGmail = async (history: H.History) => {
  const provider = new firebase.auth.GoogleAuthProvider()
  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        history.length > 2 ? history.goBack() : history.replace('/')
      })
      .catch((error: any) => {
        const { code, message } = error
        console.log(`${code}: ${message}`)
      })
  } catch (error) {
    const { code, message } = error
    console.log(`${code}: ${message}`)
  }
}

const loginWithFacebook = async (history: H.History) => {
  const provider = new firebase.auth.FacebookAuthProvider()

  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        history.length > 2 ? history.goBack() : history.replace('/')
      })
      .catch((error: any) => {
        const { code, message } = error
        console.log(`${code}: ${message}`)
      })
  } catch (error) {
    const { code, message } = error
    console.log(`${code}: ${message}`)
  }
}

const loginWithGithub = async (history: H.History) => {
  const provider = new firebase.auth.GithubAuthProvider()

  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        history.length > 2 ? history.goBack() : history.replace('/')
      })
      .catch((error: any) => {
        const { code, message } = error
        console.log(`${code}: ${message}`)
      })
  } catch (error) {
    const { code, message } = error
    console.log(`${code}: ${message}`)
  }
}

import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd'
import styled from 'styled-components'
import { StyledCard, StyledForm, StyledIcon, Others } from './Style'

import firebase from 'firebase'
import { Link } from 'react-router-dom'
import 'firebase/auth'

import { FormComponentProps } from 'antd/lib/form/Form'
import H from 'history'

interface ILoginProps {
  history: H.History
}

const LoginButton = styled(Button)`
  width: 100%;
`

const Register = styled.div`
  float: right;
  padding: 0px 24px 0px;
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

  state = {
    errorMessage: null
  }

  setError = (msg: string) => {
    this.setState({ errorMessage: msg })
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
            } else
              this.props.history.length > 2
                ? this.props.history.goBack()
                : this.props.history.replace('/')
        })
        .catch(error => {
          this.setError(error.message)
        })
    } catch (error) {
      this.setError(error.message)
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Row type="flex" align="middle">
        <StyledCard>
          <Col>
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
                {this.state.errorMessage ? (
                  <p>{this.state.errorMessage}</p>
                ) : null}
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
                    onClick={() =>
                      loginWithGmail(this.props.history, this.setError)
                    }
                  />
                  <StyledIcon
                    type="facebook"
                    theme="outlined"
                    onClick={() =>
                      loginWithFacebook(this.props.history, this.setError)
                    }
                  />
                  <StyledIcon
                    type="github"
                    theme="outlined"
                    onClick={() =>
                      loginWithGithub(this.props.history, this.setError)
                    }
                  />
                  <Register>
                    Or <Link to="/register">register now!</Link>
                  </Register>
                </Others>
              </Form.Item>
            </StyledForm>
          </Col>
        </StyledCard>
      </Row>
    )
  }
}

export const LoginPage = Form.create({ name: 'login' })(Login) as any

const loginWithGmail = async (
  history: H.History,
  setError: (msg: string) => void
) => {
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
        const { message } = error
        setError(message)
      })
  } catch (error) {
    const { message } = error
    setError(message)
  }
}

const loginWithFacebook = async (
  history: H.History,
  setError: (msg: string) => void
) => {
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
        const { message } = error
        setError(message)
      })
  } catch (error) {
    const { message } = error
    setError(message)
  }
}

const loginWithGithub = async (
  history: H.History,
  setError: (msg: string) => void
) => {
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
        const { message } = error
        setError(message)
      })
  } catch (error) {
    const { message } = error
    setError(message)
  }
}

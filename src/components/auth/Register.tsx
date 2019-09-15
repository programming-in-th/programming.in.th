import React from 'react'
import { Form, Icon, Input, Button, Row, Col, Card } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import firebase from 'firebase'
import 'firebase/auth'

import { FormComponentProps } from 'antd/lib/form/Form'
import H from 'history'

interface IRegisterProps {
  history: H.History
}

const StyledForm = styled(Form)`
  width: 368px;
  margin: 0 auto;
`

const RegisterButton = styled(Button)`
  width: 100%;
`

const BackToMainPage = styled.div`
  float: right;
`

const Others = styled.div`
  margin-top: 24px;
  text-align: left;
`

class Register extends React.Component<
  IRegisterProps & FormComponentProps,
  {}
> {
  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.submitRegister(
          this.props.history,
          values.email,
          values.password,
          values.passwordConfirm
        )
      }
    })
  }

  state = {
    errorMessage: null
  }

  submitRegister = async (
    history: H.History,
    email: string,
    pass: string,
    passConfirm: string
  ) => {
    if (pass !== passConfirm) {
      this.setState({ errorMessage: 'Password not match' })
      return
    }
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        const currentUser = firebase.auth().currentUser
        if (currentUser) {
          currentUser.sendEmailVerification()
        }
        firebase.auth().signOut()
        history.length > 2 ? history.goBack() : history.replace('/')
      })
      .catch(error => {
        this.setState({ errorMessage: error.message })
      })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Row type="flex" align="middle">
        <Card bordered={false}>
          <Col span={12}>
            <h1>Register</h1>
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
                {getFieldDecorator('passwordConfirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your confirmed Password!'
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="password"
                    placeholder="Confirm Password"
                  />
                )}
                {this.state.errorMessage ? (
                  <a>{this.state.errorMessage}</a>
                ) : null}
              </Form.Item>
              <Form.Item>
                <RegisterButton type="primary" htmlType="submit">
                  Register
                </RegisterButton>
                <Others>
                  <BackToMainPage>
                    <Link to="/login"> Back to main page </Link>
                  </BackToMainPage>
                </Others>
              </Form.Item>
            </StyledForm>
          </Col>
        </Card>
      </Row>
    )
  }
}

export const RegisterPage = Form.create({ name: 'register' })(Register) as any

/* React */
import React, { useState } from 'react'

/* React Component */
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

/* Data model */
import firebase from 'firebase/app'
import 'firebase/auth'

import '../assets/css/login.css'

interface IButtonProps {
  id?: String
  icon?: String
  text: String
  onClick?: () => void
}

const AccountButton: React.FunctionComponent<IButtonProps> = (
  props: IButtonProps
) => {
  return (
    <Button
      id={`${props.id ? props.id : ''}`}
      variant="contained"
      color="primary"
      onClick={() => (props.onClick ? props.onClick() : null)}
    >
      {props.icon ? <i className="material-icons">{props.icon}</i> : null}
      {props.text}
    </Button>
  )
}

const loginWithGmail = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => {
      window.history.back()
    })
    .catch((error: any) => {
      const { code, message } = error
      console.log(`${code}: ${message}`)
    })
}

const loginWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider()
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => {
      window.history.back()
    })
    .catch(function(error: any) {
      const { code, message } = error
      console.log(`${code}: ${message}`)
    })
}

const LoginPage = (props: any) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  const submitLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        const currentUser = firebase.auth().currentUser
        if (currentUser)
          if (!currentUser.emailVerified) {
            firebase.auth().signOut()
            setError('Please Verify Your Email')
          } else window.history.back()
      })
      .catch(function(error) {
        setError(error.message)
      })
  }

  return (
    <form onSubmit={() => submitLogin()} style={{ width: '100%' }}>
      <div id="main-text">Login</div>
      <TextField
        id="textfield"
        label="Email"
        margin="normal"
        variant="outlined"
        onChange={event => setEmail(event.target.value)}
      />
      <TextField
        id="textfield"
        label="Password"
        margin="normal"
        type="password"
        variant="outlined"
        onChange={event => setPass(event.target.value)}
      />
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      <AccountButton
        id="login-button"
        icon="account_circle"
        text="Login"
        onClick={() => submitLogin()}
      />
      <div id="account-form">
        <AccountButton
          id="grey-button"
          icon="person_add"
          text="Register account"
          onClick={() => props.setState('register')}
        />
        <AccountButton
          id="grey-button"
          icon="apps"
          text="Different Method"
          onClick={() => props.setState('oauth')}
        />
      </div>
    </form>
  )
}

const RegisterPage = (props: any) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [passC, setPassC] = useState('')
  const [error, setError] = useState('')

  let submitRegister = () => {
    if (pass != passC) {
      setError('password not match')
      return
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        const currentUser = firebase.auth().currentUser
        if (currentUser) {
          currentUser.sendEmailVerification()
        }
        firebase.auth().signOut()
        window.history.back()
      })
      .catch(function(error) {
        setError(error.message)
      })
  }

  return (
    <form onSubmit={() => submitRegister()} style={{ width: '100%' }}>
      <div id="main-text">Register</div>
      <TextField
        id="textfield"
        label="Email"
        margin="normal"
        variant="outlined"
        onChange={event => setEmail(event.target.value)}
      />
      <TextField
        id="textfield"
        label="Password"
        margin="normal"
        type="password"
        variant="outlined"
        onChange={event => setPass(event.target.value)}
      />
      <TextField
        id="textfield"
        label="Confirm Password"
        margin="normal"
        type="password"
        variant="outlined"
        onChange={event => setPassC(event.target.value)}
      />
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      <AccountButton
        icon="person_add"
        id="login-button"
        text="Sign Up"
        onClick={() => submitRegister()}
      />
      <AccountButton
        id="grey-button"
        icon="apps"
        text="Back to Main page"
        onClick={() => props.setState('main')}
      />
    </form>
  )
}

let OAuthPage = (props: any) => {
  return (
    <React.Fragment>
      <div id="oauth-text">Use Different Method</div>
      <Button id="google-button" onClick={() => loginWithGmail()}>
        <i>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" />
        </i>
        Sign in with Google
      </Button>
      <Button id="facebook-button" onClick={() => loginWithFacebook()}>
        <i>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" />
        </i>
        Sign in with Facebook
      </Button>
      <AccountButton
        id="grey-button"
        icon="apps"
        text="Back to Main page"
        onClick={() => props.setState('main')}
      />
    </React.Fragment>
  )
}

export const Login = () => {
  const [state, setState] = useState('main')
  return (
    <React.Fragment>
      {firebase.auth().currentUser ? (
        firebase
          .auth()
          .signOut()
          .then(() => {
            window.location.reload()
          })
      ) : (
        <div id="account-container">
          {state == 'main' ? (
            <LoginPage setState={setState} />
          ) : state == 'register' ? (
            <RegisterPage setState={setState} />
          ) : (
            <OAuthPage setState={setState} />
          )}
        </div>
      )}
    </React.Fragment>
  )
}

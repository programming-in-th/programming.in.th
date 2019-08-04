/* React */
import React, { useState } from 'react'
import { withRouter } from 'react-router'

/* React Component */
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

/* Data model */
import firebase from 'firebase/app'
import 'firebase/auth'

import H from 'history'

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

const LoginPage = (props: any) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  const submitLogin = async (history: H.History) => {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

      return firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then(() => {
          const currentUser = firebase.auth().currentUser
          if (currentUser)
            if (!currentUser.emailVerified) {
              firebase.auth().signOut()
              setError('Please Verify Your Email')
            } else history.length > 2 ? history.goBack() : history.replace('/')
        })
        .catch(function(error) {
          setError(error.message)
        })
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <form onSubmit={() => submitLogin(props.history)} style={{ width: '100%' }}>
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
        onClick={() => submitLogin(props.history)}
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

  let submitRegister = (history: H.History) => {
    if (pass !== passC) {
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
        history.length > 2 ? history.goBack() : history.replace('/')
      })
      .catch(function(error) {
        setError(error.message)
      })
  }

  return (
    <form
      onSubmit={() => submitRegister(props.history)}
      style={{ width: '100%' }}
    >
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
        onClick={() => submitRegister(props.history)}
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

const OAuthPage = (props: any) => {
  return (
    <React.Fragment>
      <div id="oauth-text">Use Different Method</div>
      <Button id="google-button" onClick={() => loginWithGmail(props.history)}>
        <i>
          <img
            alt="google"
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          />
        </i>
        Sign in with Google
      </Button>
      <Button
        id="facebook-button"
        onClick={() => loginWithFacebook(props.history)}
      >
        <i>
          <img
            alt="facebook "
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"
          />
        </i>
        Sign in with Facebook
      </Button>
      <Button 
        id="github-button" 
        onClick={() => loginWithGithub(props.history)}
      >
        <i>
          <img
            alt="github"
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/github.svg"
          />
        </i>
        Sign in with GitHub
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

export const Auth = (props: any) => {
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
          {state === 'main' ? (
            <LoginPage setState={setState} history={props.history} />
          ) : state === 'register' ? (
            <RegisterPage setState={setState} history={props.history} />
          ) : (
            <OAuthPage setState={setState} history={props.history} />
          )}
        </div>
      )}
    </React.Fragment>
  )
}

export const AuthPage = withRouter(Auth)

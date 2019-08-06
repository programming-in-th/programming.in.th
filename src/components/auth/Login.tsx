import React, { useState } from 'react'
import firebase from 'firebase'
import 'firebase/auth'

import TextField from '@material-ui/core/TextField'
import { AccountButton } from './AccountButton'

import H from 'history'

interface ILoginPageProps {
  history: H.History
  setState(arg: string): any
}

export const LoginPage: React.FunctionComponent<ILoginPageProps> = props => {
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

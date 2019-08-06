import React, { useState } from 'react'
import firebase from 'firebase'
import 'firebase/auth'

import TextField from '@material-ui/core/TextField'
import { AccountButton } from './AccountButton'

import H from 'history'

interface IRegisterPageProps {
  history: H.History
  setState(arg: string): any
}

export const RegisterPage: React.FunctionComponent<
  IRegisterPageProps
> = props => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [passC, setPassC] = useState('')
  const [error, setError] = useState('')

  const submitRegister = (history: H.History) => {
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

/* React */
import React, { useState } from 'react'
import { withRouter } from 'react-router'

import H from 'history'
/* Data model */
import firebase from 'firebase/app'
import 'firebase/auth'

import { LoginPage } from '../components/auth/Login'
import { RegisterPage } from '../components/auth/Register'

import '../assets/css/login.css'

interface IAuthPageProps {
  history: H.History
}

export const Auth: React.FunctionComponent<IAuthPageProps> = props => {
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
          ) : (
            <RegisterPage setState={setState} history={props.history} />
          )}
        </div>
      )}
    </React.Fragment>
  )
}

export const AuthPage = withRouter(Auth)

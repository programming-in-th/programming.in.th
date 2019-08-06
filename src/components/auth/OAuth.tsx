import React from 'react'
import firebase from 'firebase'
import 'firebase/auth'

import { AccountButton } from './AccountButton'
import Button from '@material-ui/core/Button'

import H from 'history'

interface IOAuthProps {
  history: H.History
  setState(arg: string): any
}

export const OAuthPage: React.FunctionComponent<IOAuthProps> = props => {
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
      <Button id="github-button" onClick={() => loginWithGithub(props.history)}>
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

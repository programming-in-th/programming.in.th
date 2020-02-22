import React from 'react'
import { NextRouter } from 'next/router'
import { StyledIcon } from './Common'

import firebase from '../../lib/firebase'

interface ISocialProps {
  router: NextRouter
  setError: (msg: string) => void
}

export const WithGoogle = (props: ISocialProps) => (
  <StyledIcon
    type="google"
    theme="outlined"
    onClick={() => loginWithGmail(props.router, props.setError)}
  />
)

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

export const WithFacebook = (props: ISocialProps) => (
  <StyledIcon
    type="facebook"
    theme="outlined"
    onClick={() => loginWithFacebook(props.router, props.setError)}
  />
)

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

export const WithGithub = (props: ISocialProps) => (
  <StyledIcon
    type="github"
    theme="outlined"
    onClick={() => loginWithGithub(props.router, props.setError)}
  />
)

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

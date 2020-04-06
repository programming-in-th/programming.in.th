import React, { useState } from 'react'
import Router from 'next/router'
import { Button, Text } from '@chakra-ui/core'

import firebase from '../../lib/firebase'

const loginWithGmail = async (setError: (msg: string) => void) => {
  const provider = new firebase.auth.GoogleAuthProvider()
  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        Router.push('/')
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

const loginWithFacebook = async (setError: (msg: string) => void) => {
  const provider = new firebase.auth.FacebookAuthProvider()

  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        Router.push('/')
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

const loginWithGithub = async (setError: (msg: string) => void) => {
  const provider = new firebase.auth.GithubAuthProvider()

  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        Router.push('/')
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

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string>(null)
  const [load, setLoad] = useState<number>(0)
  const setError = (err: string) => {
    setErrorMessage(err)
    setLoad(0)
  }
  return (
    <React.Fragment>
      <Button
        isLoading={load === 1}
        mt={2}
        width="100%"
        fontFamily="heading"
        onClick={() => {
          setLoad(1)
          loginWithGmail(setError)
        }}
      >
        Login With Google
      </Button>
      <Button
        mt={4}
        isLoading={load === 2}
        width="100%"
        fontFamily="heading"
        onClick={() => {
          setLoad(2)
          loginWithFacebook(setError)
        }}
      >
        Login With Facebook
      </Button>
      <Button
        mt={4}
        isLoading={load === 3}
        width="100%"
        fontFamily="heading"
        onClick={() => {
          setLoad(3)
          loginWithGithub(setError)
        }}
      >
        Login With Github
      </Button>
      <Text color="red.500" mt={4}>
        {errorMessage}
      </Text>
    </React.Fragment>
  )
}

export const OAuthLogin = Login

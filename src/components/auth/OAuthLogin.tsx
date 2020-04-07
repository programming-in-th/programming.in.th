import React, { useState } from 'react'
import Router from 'next/router'
import { Button, Text, Flex } from '@chakra-ui/core'
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa'

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

  const setError = (err: string) => {
    setErrorMessage(err)
  }

  return (
    <Flex mt={2} direction={['column', 'row']}>
      <Button
        fontFamily="heading"
        onClick={() => {
          loginWithGmail(setError)
        }}
        leftIcon={FaGoogle}
      >
        Login With Google
      </Button>
      <Button
        mt={[2, 0]}
        ml={[0, 2]}
        fontFamily="heading"
        onClick={() => {
          loginWithFacebook(setError)
        }}
        leftIcon={FaFacebook}
      >
        Login With Facebook
      </Button>
      <Button
        mt={[2, 0]}
        ml={[0, 2]}
        fontFamily="heading"
        onClick={() => {
          loginWithGithub(setError)
        }}
        leftIcon={FaGithub}
      >
        Login With Github
      </Button>
      <Text color="red.500" mt={4}>
        {errorMessage}
      </Text>
    </Flex>
  )
}

export const OAuthLogin = Login

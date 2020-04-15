import React, { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Button, Text, Flex, Box, Link as ChakraLink } from '@chakra-ui/core'
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

const LButton = props => {
  return (
    <Button
      h={12}
      w="100%"
      mt={4}
      fontFamily="heading"
      fontSize="lg"
      onClick={() => {
        props.lfunc(props.setError)
      }}
      leftIcon={props.icon}
    >
      {props.text}
    </Button>
  )
}

const Login = ({ setErrorMessage }) => {
  const setError = (err: string) => {
    setErrorMessage(err)
  }
  return (
    <React.Fragment>
      <LButton
        lfunc={loginWithGmail}
        setError={setError}
        icon={FaGoogle}
        text="Continue with Google"
      />
      <LButton
        lfunc={loginWithFacebook}
        setError={setError}
        icon={FaFacebook}
        text="Continue with Facebook"
      />
      <LButton
        lfunc={loginWithGithub}
        setError={setError}
        icon={FaGithub}
        text="Continue with Github"
      />
    </React.Fragment>
  )
}

export const OAuthLogin = Login

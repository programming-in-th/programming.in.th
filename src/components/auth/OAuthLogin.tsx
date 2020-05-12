import React from 'react'
import Router from 'next/router'
import { Button } from '@chakra-ui/core'
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa'
import { IconType } from 'react-icons/lib'

import firebase from 'lib/firebase'

type authtype =
  | typeof firebase.auth.GoogleAuthProvider
  | typeof firebase.auth.FacebookAuthProvider
  | typeof firebase.auth.GithubAuthProvider

const loginWith = async (
  setError: (msg: string) => void,
  fprovider: authtype
) => {
  const provider = new fprovider()
  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        Router.push('/')
      })
  } catch (error) {
    setError(error.message)
  }
}

interface IButton {
  setError: (msg: string) => void
  lfunc: authtype
  icon: IconType
  text: string
}

const LButton = (props: IButton) => {
  return (
    <Button
      h={12}
      w="100%"
      mt={4}
      fontFamily="heading"
      fontSize="lg"
      onClick={() => {
        loginWith(props.setError, props.lfunc)
      }}
      leftIcon={props.icon}
    >
      {props.text}
    </Button>
  )
}

const Login = ({ setErrorMessage }) => {
  const { auth } = firebase
  return (
    <React.Fragment>
      <LButton
        lfunc={auth.GoogleAuthProvider}
        setError={setErrorMessage}
        icon={FaGoogle}
        text="Continue with Google"
      />
      <LButton
        lfunc={auth.FacebookAuthProvider}
        setError={setErrorMessage}
        icon={FaFacebook}
        text="Continue with Facebook"
      />
      <LButton
        lfunc={auth.GithubAuthProvider}
        setError={setErrorMessage}
        icon={FaGithub}
        text="Continue with Github"
      />
    </React.Fragment>
  )
}

export const OAuthLogin = Login

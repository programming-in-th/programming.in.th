import React, { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {
  Button,
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Input,
  Link as ChakraLink,
  Flex,
} from '@chakra-ui/core'
import { FaRegEnvelope, FaLock } from 'react-icons/fa'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'

import firebase from 'lib/firebase'

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Please enter your email'),
  pass: Yup.string().required('Please enter your password'),
})

const Login = ({ setErrorMessage }) => {
  const [isClick, setIsClick] = useState<boolean>(false)

  const setError = (err: string) => {
    setErrorMessage(err)
    setIsClick(false)
  }

  return (
    <Box w="100%">
      <Formik
        initialValues={{ email: '', pass: '', remember: false }}
        validationSchema={LoginSchema}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true)
          if (values.remember) {
            await firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          }
          await firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.pass)
            .then(() => {
              const currentUser = firebase.auth().currentUser
              if (currentUser)
                if (!currentUser.emailVerified) {
                  firebase.auth().signOut()
                  setError('Please Verify Your Email')
                } else {
                  Router.push('/')
                }
            })
            .catch((error) => {
              setError(error.message)
            })
          actions.setSubmitting(false)
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.email && form.touched.email && isClick === true
                  }
                >
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      children={<Box as={FaRegEnvelope} color="gray.300" />}
                    />
                    <Input
                      {...field}
                      id="email"
                      placeholder="Enter Your Email"
                    />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="pass">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.pass && form.touched.pass && isClick === true
                  }
                  mt={4}
                >
                  <FormLabel htmlFor="pass">Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      children={<Box as={FaLock} color="gray.300" />}
                    />
                    <Input
                      {...field}
                      id="pass"
                      type="password"
                      placeholder="Enter Your Password"
                    />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.pass}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Flex justify="space-between" direction="row" align="center" mt={4}>
              <Field name="remember">
                {({ field }) => <Checkbox {...field}>Remember</Checkbox>}
              </Field>
              <Link href="/login/reset">
                <ChakraLink
                  href="/login/reset"
                  lineHeight="18px"
                  color="gray.500"
                >
                  forget password?
                </ChakraLink>
              </Link>
            </Flex>
            <Button
              mt={4}
              isLoading={props.isSubmitting}
              type="submit"
              width="100%"
              fontFamily="heading"
              onClick={() => {
                setIsClick(true)
              }}
            >
              Login
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export const EmailLogin = Login

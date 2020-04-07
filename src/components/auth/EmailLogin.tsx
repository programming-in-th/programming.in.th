import React, { useState } from 'react'
import Router from 'next/router'
import {
  Button,
  Box,
  Checkbox,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Input,
  Text
} from '@chakra-ui/core'
import { FaRegEnvelope, FaLock } from 'react-icons/fa'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import firebase from '../../lib/firebase'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string>(null)
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Please enter your email'),
    pass: Yup.string().required('Please enter your password')
  })

  return (
    <React.Fragment>
      <Heading as="h1" size="xl" mb={5}>
        Login
      </Heading>
      <Formik
        initialValues={{ email: '', pass: '', remember: false }}
        validationSchema={LoginSchema}
        onSubmit={async (values, actions) => {
          try {
            actions.setSubmitting(true)

            if (values.remember) {
              await firebase
                .auth()
                .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            }

            return firebase
              .auth()
              .signInWithEmailAndPassword(values.email, values.pass)
              .then(() => {
                const currentUser = firebase.auth().currentUser
                if (currentUser)
                  if (!currentUser.emailVerified) {
                    firebase.auth().signOut()
                    window.alert('Please Verify Your Email')
                  } else {
                    Router.push('/')
                  }
              })

              .catch(error => {
                setErrorMessage(error.message)
              })
          } catch (error) {
            setErrorMessage(error.message)
          }

          actions.setSubmitting(false)
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
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
                  isInvalid={form.errors.pass && form.touched.pass}
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
            <Field name="remember">
              {({ field }) => (
                <Checkbox {...field} mt={4}>
                  Remember
                </Checkbox>
              )}
            </Field>
            <Button
              mt={4}
              isLoading={props.isSubmitting}
              type="submit"
              width="100%"
              fontFamily="heading"
            >
              Login
            </Button>
          </form>
        )}
      </Formik>
      <Text color="red.500" mt={4}>
        {errorMessage}
      </Text>
    </React.Fragment>
  )
}

export const EmailLogin = Login

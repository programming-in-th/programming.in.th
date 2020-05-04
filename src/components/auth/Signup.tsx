import React, { useState } from 'react'
import Router from 'next/router'
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Input,
  Text,
  useToast,
} from '@chakra-ui/core'
import { FaRegEnvelope, FaLock } from 'react-icons/fa'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import firebase from '../../lib/firebase'

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Please enter your email'),
  pass: Yup.string().required('Please enter your password'),
})

export const Signup = () => {
  const [errorMessage, setErrorMessage] = useState<string>(null)
  const [isClick, setIsClick] = useState<boolean>(false)
  const toast = useToast()

  const setError = (err: string) => {
    setErrorMessage(err)
    setIsClick(false)
  }

  return (
    <React.Fragment>
      <Formik
        initialValues={{ email: '', pass: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true)
          await firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.pass)
            .then(() => {
              const currentUser = firebase.auth().currentUser
              if (currentUser) {
                currentUser.sendEmailVerification()
                firebase.auth().signOut()
                toast({
                  title: 'Account created.',
                  description: 'Please Verify Your Email.',
                  status: 'success',
                  position: 'top',
                  duration: 3000,
                  isClosable: true,
                })
                Router.push('/login')
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
                  mt={4}
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
              Register
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

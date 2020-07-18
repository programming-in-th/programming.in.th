import React, { useState } from 'react'
import Router from 'next/router'
import {
  Button,
  Box,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/core'
import { FaRegEnvelope } from 'react-icons/fa'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'

import firebase from 'lib/firebase'

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Please enter your email'),
})

export const Reset = ({ setErrorMessage }) => {
  const [isClick, setIsClick] = useState<boolean>(false)
  const toast = useToast()
  const setError = (err: string) => {
    setErrorMessage(err)
    setIsClick(false)
  }

  return (
    <Box w="100%">
      <Formik
        initialValues={{ email: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true)

          await firebase
            .auth()
            .sendPasswordResetEmail(values.email)
            .then(() => {
              toast({
                title: 'Reset password have been sent',
                description: 'Please Check your email',
                status: 'success',
                position: 'top',
                duration: 4000,
                isClosable: true,
              })
              Router.push('/login')
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
              Reset Password
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  )
}

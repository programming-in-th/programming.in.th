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
import { mutate } from 'swr'
import { FaUser } from 'react-icons/fa'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import firebase from 'lib/firebase'
import { Data } from 'components/UserContext'

const SetUsernameSchema = Yup.object().shape({
  username: Yup.string().required('Please Enter Your Username'),
})

export const SetUsernameComponent = ({ setErrorMessage }) => {
  const [isClick, setIsClick] = useState<boolean>(false)
  const toast = useToast()
  const setError = (err: string) => {
    setErrorMessage(err)
    setIsClick(false)
  }

  return (
    <Box w="100%">
      <Formik
        initialValues={{ username: '' }}
        validationSchema={SetUsernameSchema}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true)
          const response = await firebase
            .app()
            .functions('asia-east2')
            .httpsCallable('setUsername')({ username: values.username })
          if (response.data) {
            toast({
              title: 'Successful',
              description: 'Set Username Successful',
              status: 'success',
              position: 'top',
              duration: 3000,
              isClosable: true,
            })
            await mutate('getUserContext', async (user: Data) => {
              return { ...user, username: values.username }
            })
            Router.push('/')
          } else {
            setError('Please use another Username')
            actions.setSubmitting(false)
          }
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Field name="username">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.username &&
                    form.touched.username &&
                    isClick === true
                  }
                >
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      children={<Box as={FaUser} color="gray.300" />}
                    />
                    <Input
                      {...field}
                      id="username"
                      placeholder="Enter Your Username"
                      isReadOnly={props.isSubmitting}
                    />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
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
              Set Username
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  )
}

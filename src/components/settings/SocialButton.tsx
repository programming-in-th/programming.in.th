import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Button, message, Modal } from 'antd'

const extractProviderList = (user: firebase.User): string[] => {
  const result = []

  if (user.providerData) {
    for (let i = 0; i < user.providerData.length; i++) {
      result.push(user.providerData[i]!.providerId)
    }
  }

  return result
}

const checkProvider = (
  providerList: string[],
  providerName: string
): boolean => {
  return providerList.includes(providerName)
}

const warnLastProvider = (providerList: string[]): boolean => {
  return providerList.length === 1
}

interface ISocialButtonProps {
  user: firebase.User
  provider:
    | firebase.auth.GithubAuthProvider
    | firebase.auth.GoogleAuthProvider
    | firebase.auth.FacebookAuthProvider
  forceUpdate: () => void
}

export const SocialButton: React.FunctionComponent<ISocialButtonProps> = ({
  user,
  provider,
  forceUpdate
}: ISocialButtonProps) => {
  const [isOK, ok] = useState(false)
  const [isModalVisible, setModalVisibility] = useState(false)
  const [buttonAval, setButtonAval] = useState(false)

  const handleOk = () => {
    ok(true)
    setModalVisibility(false)
  }

  const handleCancel = () => {
    ok(false)
    setModalVisibility(false)
  }

  const showModal = () => {
    setModalVisibility(true)
    setTimeout(() => {
      setButtonAval(true)
    }, 3000)
  }

  const afterClose = () => {
    if (isOK) {
      user
        .unlink(provider.providerId)
        .then(() => {
          message.success('Unlinked!')
          forceUpdate()
        })
        .catch(() => message.error('Unlinking Rrror!'))
    }
  }

  const handleBinding = (bindingStatus: boolean) => {
    if (bindingStatus) {
      if (warnLastProvider(extractProviderList(user))) {
        showModal()
      }
    } else {
      user
        .linkWithPopup(provider)
        .then(() => {
          message.success(`Linked to ${provider.providerId}`)
          forceUpdate()
        })
        .catch(() => message.error('Linking Error!'))
    }
  }

  return (
    <React.Fragment>
      <Button
        type="link"
        onClick={() =>
          handleBinding(
            checkProvider(extractProviderList(user), provider.providerId)
          )
        }
      >
        {checkProvider(extractProviderList(user), provider.providerId)
          ? 'Unlink'
          : 'Link'}
      </Button>
      <Modal
        title="Are you sure you want to unbind your LAST sign in provider?"
        visible={isModalVisible}
        okType="danger"
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !buttonAval }}
        afterClose={afterClose}
      >
        <p>
          You may unable to access your account again. This action cannot be
          undone
        </p>
      </Modal>
    </React.Fragment>
  )
}

import React from 'react'
import { List, Icon, Button, message } from 'antd'
import styled from 'styled-components'
import firebase from 'firebase/app'
import 'firebase/auth'

const StyledIcon = styled(Icon)`
  margin-left: 16px;
  color: rgba(0, 0, 0, 0.2);
  font-size: 18px;
  vertical-align: middle;
  transition: color 0.3s;

  &:hover {
    color: #188fff;
  }
`

const Provider = {
  google: new firebase.auth.GoogleAuthProvider(),
  facebook: new firebase.auth.FacebookAuthProvider(),
  github: new firebase.auth.GithubAuthProvider()
}

interface ISocialSettingProps {
  user: firebase.User
}

const extractProviderList = (user: firebase.User): string[] => {
  const result = []

  if (user.providerData) {
    for (let i = 0; i < user.providerData.length; i++) {
      result.push(user.providerData[i]!.providerId)
    }
  }

  return result
}

const checkProvider = (providerList: string[], providerName: string) => {
  return providerList.includes(providerName)
}

interface ISocialButtonProps {
  user: firebase.User
  provider:
    | firebase.auth.GithubAuthProvider
    | firebase.auth.GoogleAuthProvider
    | firebase.auth.FacebookAuthProvider
  providerId: 'github.com' | 'facebook.com' | 'google.com'
}

const SocialButton: React.FunctionComponent<ISocialButtonProps> = ({
  user,
  provider,
  providerId
}: ISocialButtonProps) => {
  const handleBinding = (status: boolean) => {
    if (status) {
      user.unlink(providerId).then(() => message.success('Unbounded!'))
    } else {
      user.linkWithPopup(provider).then(() => message.success('Binded!'))
    }
  }

  return (
    <Button
      type="link"
      onClick={() =>
        handleBinding(checkProvider(extractProviderList(user), providerId))
      }
    >
      {checkProvider(extractProviderList(user), providerId)
        ? 'Unbound'
        : 'Bind'}
    </Button>
  )
}

export const SocialSetting: React.FunctionComponent<ISocialSettingProps> = (
  props: ISocialSettingProps
) => {
  const getData = (user: firebase.User) => [
    {
      title: 'Facebook',
      description: '',
      actions: [
        <SocialButton
          user={user}
          provider={Provider.facebook}
          providerId="facebook.com"
        ></SocialButton>
      ],
      avatar: <StyledIcon type="facebook" theme="outlined" />
    },
    {
      title: 'Google',
      description: '',
      actions: [
        <SocialButton
          user={user}
          provider={Provider.google}
          providerId="google.com"
        ></SocialButton>
      ],
      avatar: <StyledIcon type="google" theme="outlined" />
    },
    {
      title: 'GitHub',
      description: '',
      actions: [
        <SocialButton
          user={user}
          provider={Provider.github}
          providerId="github.com"
        ></SocialButton>
      ],
      avatar: <StyledIcon type="github" theme="outlined" />
    }
  ]

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={getData(props.user)}
        size="large"
        renderItem={(item: any) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta
              avatar={item.avatar}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

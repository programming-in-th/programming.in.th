import React from 'react'
import { List, Icon } from 'antd'
import styled from 'styled-components'
import firebase from 'firebase/app'
import 'firebase/auth'

import { useForceUpdate } from '../../utils/useForceUpdate'
import { SocialButton } from './SocialButton'

import { getDescriptionText } from './utils'

const StyledIcon = styled(Icon)`
  margin-left: 16px;
  color: rgba(0, 0, 0, 0.2);
  font-size: 48px;
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

export const SocialSetting: React.FunctionComponent<ISocialSettingProps> = (
  props: ISocialSettingProps
) => {
  const forceUpdate = useForceUpdate()
  const getData = (user: firebase.User) => [
    {
      title: 'Facebook',
      description: getDescriptionText(user, 'facebook.com'),
      actions: [
        <SocialButton
          user={user}
          provider={Provider.facebook}
          forceUpdate={forceUpdate}
        ></SocialButton>
      ],
      avatar: <StyledIcon type="facebook" theme="outlined" />
    },
    {
      title: 'Google',
      description: getDescriptionText(user, 'google.com'),
      actions: [
        <SocialButton
          user={user}
          provider={Provider.google}
          forceUpdate={forceUpdate}
        ></SocialButton>
      ],
      avatar: <StyledIcon type="google" theme="outlined" />
    },
    {
      title: 'GitHub',
      description: getDescriptionText(user, 'github.com'),
      actions: [
        <SocialButton
          user={user}
          provider={Provider.github}
          forceUpdate={forceUpdate}
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

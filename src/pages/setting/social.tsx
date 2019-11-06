import React from 'react'

import { SettingPageLayout } from '../../components/setting/SettingLayout'
import { SocialSetting } from '../../components/setting/Social'

import { useUser } from '../../components/UserContext'

export default () => {
  const { user } = useUser()

  return (
    <SettingPageLayout>
      <SocialSetting user={user}></SocialSetting>
    </SettingPageLayout>
  )
}

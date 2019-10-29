import React from 'react'

import { SettingPageLayout } from '../../components/setting/SettingLayout'
import { SocialSetting } from '../../components/setting/Social'
import { useSelector } from 'react-redux'
import { IAppState } from '../../redux'

export default () => {
  const user = useSelector(
    (state: IAppState) => state.user.user
  ) as firebase.User

  return (
    <SettingPageLayout>
      <SocialSetting user={user}></SocialSetting>
    </SettingPageLayout>
  )
}

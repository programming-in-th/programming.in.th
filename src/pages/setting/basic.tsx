import React from 'react'

import { SettingPageLayout } from '../../components/setting/SettingLayout'
import { BasicSettings } from '../../components/setting/Basic'

import { useUser } from '../../components/UserContext'

export default () => {
  const { user } = useUser()

  return (
    <SettingPageLayout>
      <BasicSettings user={user}></BasicSettings>
    </SettingPageLayout>
  )
}

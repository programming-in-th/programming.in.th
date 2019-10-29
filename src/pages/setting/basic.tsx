import React from 'react'

import { SettingPageLayout } from '../../components/setting/SettingLayout'
import { BasicSettings } from '../../components/setting/Basic'
import { useSelector } from 'react-redux'
import { IAppState } from '../../redux'

export default () => {
  const user = useSelector((state: IAppState) => state.user.user)

  return (
    <SettingPageLayout>
      <BasicSettings user={user}></BasicSettings>
    </SettingPageLayout>
  )
}

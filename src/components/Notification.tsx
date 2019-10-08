import React from 'react'
import { Redirect } from 'react-router-dom'
import { notification } from 'antd'
import { IconType } from 'antd/lib/notification'

export const openNotificationWithIcon = (
  type: IconType,
  message: string,
  description: string,
  submissionID: string
): void => {
  notification[type]({
    message: message,
    description: description,
    onClick: () => <Redirect to={`/submissions/${submissionID}`}></Redirect>
  })
}

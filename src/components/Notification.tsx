import { notification } from 'antd'
import { IconType } from 'antd/lib/notification'

export const openNotificationWithIcon = (
  type: IconType,
  message: string,
  description: string
): void => {
  notification[type]({
    message: message,
    description: description
  })
}

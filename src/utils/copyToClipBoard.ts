import { openNotificationWithIcon } from '../components/Notification'

export function copyToClipboard(toCopy: string) {
  const el = document.createElement(`textarea`)
  el.value = toCopy
  el.setAttribute(`readonly`, ``)
  el.style.position = `absolute`
  el.style.left = `-9999px`
  document.body.appendChild(el)
  el.select()
  document.execCommand(`copy`)
  openNotificationWithIcon('success', 'Copied!', 'Copied to clipboard!')
  document.body.removeChild(el)
}

import Link from 'next/link'
import { useRouter } from 'next/router'

import DashboardTabComponent from './types'

import './dashboard-tab.styl'

const Tab: DashboardTabComponent = ({ href, children }) => {
  let { route } = useRouter()

  return (
    <Link href={href}>
      <a className={`dashboard-tab ${route === href ? '-active' : ''}`}>
        {children}
      </a>
    </Link>
  )
}

export default Tab

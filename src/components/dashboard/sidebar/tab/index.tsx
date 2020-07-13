import Link from 'next/link'

import './tab.styl'

import TabComponent from './types'

/**
 * * Dashboard Tab Props
 *
 * Use to navigate between dashboard page via id.
 */
const Tab: TabComponent = ({ icon, children, href, active = false }) => (
  <Link href={`${href}`}>
    <a className={`tab ${active ? '-active' : ''}`}>
      {icon}
      {children}
    </a>
  </Link>
)

export default Tab

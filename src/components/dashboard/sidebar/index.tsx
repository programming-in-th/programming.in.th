import { useCallback } from 'react'

import Heading from './heading'
import Tab from './tab'

import './dashboard-sidebar.styl'

const Sidebar = () => {
  let composeTab = useCallback(
    (title: string, href: string) => ({
      title,
      href
    }),
    []
  )

  let tabs = [
    composeTab('Hello World', '/dashboard'),
    composeTab('Umarun', '/Umarun'),
    composeTab('Umarun', '/Umarun'),
    composeTab('Umarun', '/Umarun'),
    composeTab('Umarun', '/Umarun'),
    composeTab('Umarun', '/Umarun')
  ]

  return (
    <aside id="dashboard-sidebar">
      <Heading />
      {tabs.map(({ title, href }) => (
        <Tab key={title} href={href}>
          {title}
        </Tab>
      ))}
    </aside>
  )
}

export default Sidebar

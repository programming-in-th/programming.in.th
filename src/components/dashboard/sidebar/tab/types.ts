import { FunctionComponent, ReactChild } from 'react'

interface TabProps {
  icon: ReactChild
  children: ReactChild | string
  href: string
  active?: boolean
}

type TabComponent = FunctionComponent<TabProps>
export default TabComponent

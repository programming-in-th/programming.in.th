import { FunctionComponent, ReactText } from 'react'

interface DashboardTabProps {
  href: string
  children: ReactText
}

type DashboardTabComponent = FunctionComponent<DashboardTabProps>
export default DashboardTabComponent

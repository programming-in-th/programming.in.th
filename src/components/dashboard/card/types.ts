import { FunctionComponent, ReactNode } from 'react'

interface DashboardCardProps {
  children: ReactNode
  size?: 'normal' | 'wide' | 'fit'
  width?: string | number
  height?: string | number
}

type DashboardCardComponent = FunctionComponent<DashboardCardProps>
export default DashboardCardComponent

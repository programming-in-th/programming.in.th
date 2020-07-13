import { FunctionComponent, ReactChild } from 'react'

interface ContainerProps {
  children: ReactChild
  height?: boolean | number
}

type ContainerComponent = FunctionComponent<ContainerProps>
export default ContainerComponent

import { FunctionComponent, ReactChild } from 'react'

export interface CardProps {
  title: String
  href: any
  children: ReactChild
  footer?: boolean | String | ReactChild
}

type CardComponent = FunctionComponent<CardProps>
export default CardComponent

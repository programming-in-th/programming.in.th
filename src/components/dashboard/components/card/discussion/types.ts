import { FunctionComponent, ReactChild } from 'react'

import { CardProps } from '../types'

interface DiscussionCardProps extends CardProps {
  footer?: null
  by: {
    name: string
    image: string
  }
}

type DiscussionCardComponent = FunctionComponent<DiscussionCardProps>
export default DiscussionCardComponent

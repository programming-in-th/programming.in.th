import { FunctionComponent } from 'react'

import { CardProps } from '../types'

export type Level = 'easy' | 'medium' | 'hard'

export interface ProblemCardProps extends CardProps {
  footer?: null
  level: Level
}

type ProblemCardComponent = FunctionComponent<ProblemCardProps>
export default ProblemCardComponent

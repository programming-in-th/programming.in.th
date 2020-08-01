import { FunctionComponent, ReactText } from 'react'

interface LandingShowcaseProps {
  title: ReactText
  children: ReactText
  src: string
  alt: string
  reverse?: boolean
}

type LandingShowcaseComponent = FunctionComponent<LandingShowcaseProps>
export default LandingShowcaseComponent

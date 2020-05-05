import { FunctionComponent, ReactText } from 'react'

interface LandingDetailProps {
  title: ReactText
  children: ReactText
}

type LandingDetailComponent = FunctionComponent<LandingDetailProps>
export default LandingDetailComponent

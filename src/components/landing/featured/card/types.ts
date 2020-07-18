import { FunctionComponent, ReactText } from 'react'

interface LandingCardProps {
  title: ReactText
  children: ReactText
  href: string
  src: string
  alt: string
}

interface LandingCardWithoutImageProps {
  title: ReactText
  children: ReactText
  href: string
  src?: string
  alt?: null
}

type LandingCardComponent = FunctionComponent<
  LandingCardProps | LandingCardWithoutImageProps
>
export default LandingCardComponent

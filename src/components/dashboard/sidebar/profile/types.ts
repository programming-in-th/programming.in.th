import { FunctionComponent } from 'react'

interface ProfileProps {
  children: string
  image: string
  href: string
}

type ProfileComponent = FunctionComponent<ProfileProps>
export default ProfileComponent

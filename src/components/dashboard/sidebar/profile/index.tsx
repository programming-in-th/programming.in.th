import Link from 'next/link'

import './profile.styl'

import ProfileComponent from './types'

/**
 * * Dashboard Tab Props
 *
 * Use to navigate between dashboard page via id.
 */
const Profile: ProfileComponent = ({ image, children, href }) => (
  <section className="profile">
    <Link href={`${href}`}>
      <a className="tab">
        <img
          className="image"
          src={image}
          alt={`${children}'s profile image`}
        />
        <p className="name">{children}</p>
      </a>
    </Link>
  </section>
)

export default Profile

import Link from 'next/link'

import './landing-join.styl'

const Join = () => (
  <article id="landing-join">
    <h3 className="title">Learn Together</h3>
    <p className="detail">
      We got you cover and help you get better for learning, experiencing and
      experimenting. Over 10,000 developers all over the community has joined
      Programming.in.th and sharpen their skills.
    </p>
    <Link href="/signup">
      <a className="link">Sign Up</a>
    </Link>
  </article>
)

export default Join

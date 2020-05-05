import Link from 'next/link'

import './landing-join.styl'

const Join = () => (
  <article id="landing-join">
    <h3 className="title">Learn Together</h3>
    <p className="detail">
      We got you cover and help you get better for learning, experiencing and
      experimenting. Over 10,000+ developer all over the community has joined
      Programming.in.th and sharpen their skills.
    </p>
    <Link href="/sign-in">
      <a className="link">Let's start</a>
    </Link>
  </article>
)

export default Join

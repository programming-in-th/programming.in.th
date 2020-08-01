import Link from 'next/link'

import './landing-join.styl'

const Join = ({ translated }) => (
  <article id="landing-join">
    <h3 className="title">{translated.join.title}</h3>
    <p className="detail">{translated.join.detail}</p>
    <Link href="/signup">
      <a className="link">{translated.join.action}</a>
    </Link>
  </article>
)

export default Join

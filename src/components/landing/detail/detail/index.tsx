import LandingDetailComponent from './types'

import './landing-detail.styl'

/**
 * Landing Detail
 *
 * @param {string} title
 * @param {string} children
 *
 * eg. <Detail title="するぉもぉしょん">PinnochioP</Detail>
 */
const Detail: LandingDetailComponent = ({ title, children }) => (
  <article className="landing-detail">
    <h3 className="title">{title}</h3>
    <p className="detail">{children}</p>
  </article>
)

export default Detail

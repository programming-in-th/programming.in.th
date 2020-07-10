import Link from 'next/link'

import './activity-card.styl'

const ActivityCard = ({ title, children, href = '' }) => (
  <Link href={href}>
    <a className="activity-link">
      <article className="activity-card">
        <h4 className="title">{title}</h4>
        <p className="detail">{children}</p>
      </article>
    </a>
  </Link>
)

export default ActivityCard

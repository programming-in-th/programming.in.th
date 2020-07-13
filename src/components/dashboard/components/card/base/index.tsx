import Link from 'next/link'

import './card.styl'

import CardComponent from '../types'

const Card: CardComponent = ({ title, children, href, footer = false }) => (
  <Link href={href}>
    <a className="link">
      <article className="card">
        <h3 className="title">{title}</h3>
        <p className="detail">{children}</p>
        {footer ? <footer className="footer">{footer}</footer> : null}
      </article>
    </a>
  </Link>
)

export default Card

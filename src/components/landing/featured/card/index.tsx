import Link from 'next/link'

import LandingCardComponent from './types'

import './landing-card.styl'

/**
 * Landing Card
 *
 * Use to express current featured event.
 * @param { string } title - Title
 * @param { string } children - Detail
 * @param { string } href - Link to existed page
 * @param { string } src - Card Image's source
 * @param { string } alt - Card Image's alt
 *
 * eg.
 * <Card
 *  title="アいアいアい"
 *  href="https://music.apple.com/th/album/aiaiai-feat-中田ヤスタカ-single/id1454477904"
 *  src="https://is3-ssl.mzstatic.com/image/thumb/Music123/v4/0f/de/42/0fde4204-25ec-9627-fa0c-a37458f11575/dj.scsxwybl.jpg/540x540bb.jpg"
 *  alt="AIAIAI (feat. 中田ヤスタカ) - Single"
 * >
 *  キズナ　アイ
 * </Card>
 */
const Card: LandingCardComponent = ({ title, children, href, src, alt }) => (
  <Link href={href}>
    <a className="landing-card-link">
      <article className="landing-card">
        {src ? (
          <figure className="cover">
            <img className="image" {...{ src, alt }} loading="lazy" />
          </figure>
        ) : null}
        <section className="body">
          <h3 className="title">{title}</h3>
          <p className="detail">{children}</p>
        </section>
      </article>
    </a>
  </Link>
)

export default Card

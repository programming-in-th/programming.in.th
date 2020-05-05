import LandingShowcaseComponent from './types'

import './landing-showcase.styl'

/**
 * Showcase
 *
 * To express platform's feature, by-side with image.
 * Normally, text and image from left to right.
 *
 * @param { string } title Title.
 * @param { string } children Detail.
 * @param { string } src Image's source.
 * @param { string } alt Image's alt.
 * @param { boolean } reverse If set to true, align text and image from right to left.
 */
const Showcase: LandingShowcaseComponent = ({
  title,
  children,
  src,
  alt,
  reverse = false
}) => (
  <section className={`landing-showcase ${reverse ? '-reverse' : ''}`}>
    <article className="article">
      <h3 className="title">{title}</h3>
      <p className="detail">{children}</p>
    </article>
    <figure className="cover">
      <img className="image" {...{ src, alt }} />
    </figure>
  </section>
)

export default Showcase

import DashboardCardComponent from './types'

import './dashboard-card.styl'

/**
 * Card
 * a collection of container representation based on Material Design.
 * Card is used to visualize a part of data to contains.
 *
 * @param children
 * @param { 'normal', 'wide', 'fit' } size
 * @param { number } height
 * @param { width } width
 */
const Card: DashboardCardComponent = ({
  children,
  size = 'normal',
  width = 'auto',
  height = 'auto'
}) => (
  <article
    style={{ ...{ width, height, minWidth: width, minHeight: height } }}
    className={`dashboard-card ${size != 'normal' ? `-${size}` : ''}`}
  >
    {children}
  </article>
)

export default Card

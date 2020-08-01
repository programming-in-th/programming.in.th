import './dashboard-row.styl'

/**
 * Landing Detail Row
 *
 * To contain 'Landing Detail', has an auto-adjustment for width and responsiveness.
 * @param { HTMLElement } children
 *
 * eg. (
 *  <Row>
 *    <Detail title="Perfect Environment">Go beyond code, syntax-highlighting, close an unused block, smart completions for the best exclusive experience.</Detail>
 *  </Row>
 * )
 */
const Row = ({ children }) => (
  <section className="detail-row">{children}</section>
)

export default Row

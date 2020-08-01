import './landing-card-row.styl'

/**
 * Landing Card Row
 *
 * To contain 'Landing Card', has an auto-adjustment for width and responsiveness.
 * @param { HTMLElement } children
 *
 * eg. (
 *  <Row>
 *    <Detail title="Perfect Environment">Go beyond code, syntax-highlighting, close an unused block, smart completions for the best exclusive experience.</Detail>
 *  </Row>
 * )
 */
const Row = ({ children }) => (
  <section className="landing-card-row">{children}</section>
)

export default Row

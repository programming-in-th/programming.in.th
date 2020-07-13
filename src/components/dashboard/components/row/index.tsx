import './row.styl'

const Row = ({ children, wide = false }) => (
  <section className={`row ${wide ? '-wide' : ''}`}>{children}</section>
)

export default Row

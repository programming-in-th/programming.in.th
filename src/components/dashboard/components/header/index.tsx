import './header.styl'

const Header = ({ id, children }) => (
  <h2 id={id} className="header">
    {children}
  </h2>
)

export default Header

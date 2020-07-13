import { Menu } from '../icon'

import './navbar.styl'

const Navbar = ({ toggle }) => (
  <nav className="navbar">
    <button onClick={toggle} className="toggler">
      <Menu />
    </button>
    <h1 className="title">Programming.in.th</h1>
  </nav>
)

export default Navbar

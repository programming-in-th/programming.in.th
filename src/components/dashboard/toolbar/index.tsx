import Search from './search'
import Tools from './tools'

import './dashboard-toolbar.styl'

const Toolbar = () => (
  <nav id="dashboard-toolbar">
    <Search />
    <Tools />
  </nav>
)

export default Toolbar

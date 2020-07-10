import Sidebar from './sidebar'
import Toolbar from './toolbar'

import Row from './row'
import Card from './card'
import Header from './header'

import './dashboard.styl'

const Dashboard = ({ children }) => (
  <main id="dashboard">
    <Sidebar />
    <Toolbar />
    {children}
  </main>
)

export { Row, Card, Header }

export default Dashboard

import Sidebar from './sidebar'
import Toolbar from './toolbar'

import Row from './row'
import Card from './card'

import './dashboard.styl'

const Dashboard = ({ children }) => (
  <main id="dashboard">
    <Sidebar />
    <Toolbar />
    {children}
  </main>
)

export { Row, Card }

export default Dashboard

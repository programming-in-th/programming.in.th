import Sidebar from './sidebar'

import './dashboard.styl'

const Dashboard = ({ children }) => (
  <main id="dashboard">
    <Sidebar />
    {children}
  </main>
)

export default Dashboard

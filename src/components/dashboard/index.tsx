import { useReducer } from 'react'

import Sidebar from './sidebar'
import Navbar from './navbar'

import './dashboard.styl'

const Dashboard = ({ children }) => {
  let [showingSidebar, toggleSidebar] = useReducer(state => !state, false)

  return (
    <main id="dashboard">
      <Sidebar show={showingSidebar} />
      {showingSidebar ? (
        <div className="overlay" onClick={toggleSidebar} />
      ) : null}
      <Navbar toggle={toggleSidebar} />
      {children}
    </main>
  )
}

export default Dashboard

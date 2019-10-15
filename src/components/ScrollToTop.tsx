import React from 'react'
import { withRouter } from 'react-router-dom'

class Main extends React.Component<any> {
  componentDidUpdate(prevProps: any) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }
  render() {
    return null
  }
}

export const ScrollToTop = withRouter(Main) as any

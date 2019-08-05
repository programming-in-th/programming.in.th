import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import H from 'history'

export default function(ComposedComponent: React.ElementType) {
  class Authentication extends Component<{
    user: firebase.User
    history: H.History
  }> {
    UNSAFE_componentWillMount() {
      if (this.props.user === null) {
        this.props.history.push('/login')
      }
    }

    UNSAFE_componentWillUpdate(nextProps: { user: firebase.User }) {
      if (!nextProps.user) {
        this.props.history.push('/login')
      }
    }

    render() {
      if (this.props.user) {
        return <ComposedComponent {...this.props} />
      }
      return null
    }
  }

  const mapStateToProps: (state: any) => any = state => {
    return {
      user: state.user.user
    }
  }

  return compose(
    withRouter,
    connect(mapStateToProps)
  )(Authentication)
}

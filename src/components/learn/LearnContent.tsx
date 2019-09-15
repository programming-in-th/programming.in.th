import React from 'react'
import { CircularProgress } from '@material-ui/core'

class Learn extends React.Component<any> {
  render() {
    return this.props.currentContentStatus === 'LOADING' ? (
      <CircularProgress />
    ) : (
      <div>{this.props.currentContent}</div>
    )
  }
}

export const LearnContent = Learn

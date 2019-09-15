import React from 'react'
import { CircularProgress } from '@material-ui/core'
import MarkdownRender from './MarkdownRender'

class Learn extends React.Component<any> {
  render() {
    return this.props.currentContentStatus === 'LOADING' ? (
      <CircularProgress />
    ) : (
      <MarkdownRender source={this.props.currentContent} />
    )
  }
}

export const LearnContent = Learn

// TODO: Revert to Jupyter Notebook and merge array of strings for proper markdown

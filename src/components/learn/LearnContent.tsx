import React from 'react'
import { CircularProgress } from '@material-ui/core'
import MarkdownRender from './MarkdownRender'

class Learn extends React.Component<any> {
  render() {
    return this.props.currentContentStatus !== 'SUCCESS' ? (
      <CircularProgress />
    ) : (
      this.props.currentContent.map((snippet: string) => {
        return <MarkdownRender source={snippet} />
      })
    )
  }
}

export const LearnContent = Learn

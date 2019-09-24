import React from 'react'
import MarkdownRender from './MarkdownRender'
import { SpinWrapper } from '../SpinWrapper'

class Learn extends React.Component<any> {
  render() {
    return this.props.currentContentStatus !== 'SUCCESS' ? (
      <SpinWrapper />
    ) : (
      this.props.currentContent.map((snippet: string) => {
        return <MarkdownRender source={snippet} />
      })
    )
  }
}

export const LearnContent = Learn

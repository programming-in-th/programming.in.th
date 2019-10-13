import React from 'react'
import { MarkdownRenderer } from './MarkdownRenderer'
import { CustomSpin } from '../Spin'

class Learn extends React.Component<any> {
  render() {
    return this.props.currentContentStatus !== 'SUCCESS' ? (
      <CustomSpin />
    ) : (
      <MarkdownRenderer content={this.props.currentContent} />
    )
  }
}

export const LearnContent = Learn

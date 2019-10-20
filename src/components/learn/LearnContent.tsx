import React from 'react'
import { MarkdownRenderer } from './MarkdownRenderer'
import { CustomSpin } from '../Spin'

class Learn extends React.Component<any> {
  render() {
    return this.props.currentContentStatus !== 'SUCCESS' ? (
      <CustomSpin />
    ) : (
      <div>
        <MarkdownRenderer content={this.props.currentContent} />
      </div>
    )
  }
}

export const LearnContent = Learn

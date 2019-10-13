import React from 'react'
import { MarkdownRenderer } from './MarkdownRenderer'
import { CustomSpin } from '../Spin'

class Learn extends React.Component<any> {
  render() {
    return this.props.currentContentStatus !== 'SUCCESS' ? (
      <CustomSpin />
    ) : (
      this.props.currentContent.map((snippet: string, index: number) => {
        // Keys has to be unique. Switch to index key.
        return <MarkdownRenderer content={snippet} />
      })
    )
  }
}

export const LearnContent = Learn

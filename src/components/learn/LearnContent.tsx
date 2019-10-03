import React from 'react'
import MarkdownRender from './MarkdownRender'
import { CustomSpin } from '../Spin'

class Learn extends React.Component<any> {
  render() {
    return this.props.currentContentStatus !== 'SUCCESS' ? (
      <CustomSpin />
    ) : (
      this.props.currentContent.map((snippet: string) => {
        return <MarkdownRender source={snippet} key={snippet} />
      })
    )
  }
}

export const LearnContent = Learn

import React from 'react'
// import MarkdownRender from './MarkdownRender'
import { CustomSpin } from '../Spin'

class Learn extends React.Component<any> {
  render() {
    return this.props.currentContentStatus !== 'SUCCESS' ? (
      <CustomSpin />
    ) : (
      this.props.currentContent.map((snippet: string, index: number) => {
        // Keys has to be unique. Switch to index key.
        return <div dangerouslySetInnerHTML={{ __html: snippet }}></div>
      })
    )
  }
}

export const LearnContent = Learn

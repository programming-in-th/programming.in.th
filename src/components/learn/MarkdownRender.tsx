import React from 'react'
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown'
import styled from 'styled-components'

import MathJax from 'react-mathjax'
import RemarkMathPlugin from 'remark-math'

interface ICustomProps {}

type Props = ReactMarkdownProps & ICustomProps

const MarkDownStyle = styled.div`
  .mjx-chtml {
    white-space: normal !important;
  }
`

function MarkdownRender(props: Props) {
  const newProps = {
    ...props,
    plugins: [RemarkMathPlugin],
    renderers: {
      ...props.renderers,
      math: (props: any) => <MathJax.Node formula={props.value} />,
      inlineMath: (props: any) => <MathJax.Node inline formula={props.value} />
    }
  }

  return (
    <MathJax.Provider input="tex">
      <MarkDownStyle>
        <ReactMarkdown {...newProps} />
      </MarkDownStyle>
    </MathJax.Provider>
  )
}

export default MarkdownRender

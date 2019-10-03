import React from 'react'
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown'
import MathJax from 'react-mathjax'
import RemarkMathPlugin from 'remark-math'

import '../../assets/css/markdown_render.css'

interface ICustomProps {}

type Props = ReactMarkdownProps & ICustomProps

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
      <ReactMarkdown {...newProps} />
    </MathJax.Provider>
  )
}

export default MarkdownRender

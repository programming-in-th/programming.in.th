import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import '../../../assets/css/prism.css'

export const Code = (props: any) => {
  let language: string

  if (props.className) {
    language = props.className.replace(/language-/, '')
  }

  return (
    <SyntaxHighlighter language={language} useInlineStyles={false}>
      {props.children}
    </SyntaxHighlighter>
  )
}

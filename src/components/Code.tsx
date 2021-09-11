import React from 'react'
import { generateHtml } from 'lib/prism'

export const Code = ({ code, language }) => {
  return (
    <pre className={`language-${language} line-numbers`}>
      <div
        dangerouslySetInnerHTML={{
          __html: generateHtml({ code, language, lineNumber: true }),
        }}
      />
    </pre>
  )
}

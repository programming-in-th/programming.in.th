import React from 'react'

import Highlight, { Prism } from 'prism-react-renderer'
;((typeof global !== 'undefined' ? global : window) as any).Prism = Prism

require('prismjs/components/prism-rust')
require('prismjs/components/prism-java')

export interface CodeBlockProps {
  code: string
  language: string
}

// Direct port of https://github.com/programming-in-th/programming.in.th/blob/main/src/components/Code.tsx
// May cause bug
const Code = ({ code, language }: CodeBlockProps) => {
  return (
    <Highlight Prism={Prism} code={code} language={language as any}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={{ ...style }}
          className={`language-${language} h-[48rem] overflow-y-auto text-[13.6px]`}
        >
          <code className={`language-${language}`}>
            {tokens.map((line, i) => (
              <tr key={i} {...getLineProps({ line, key: i })}>
                <td key={i + 'l'} className="w-8	select-none	pr-2 text-gray-500">
                  {i + 1}
                </td>
                <td>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </td>
              </tr>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  )
}

export default Code

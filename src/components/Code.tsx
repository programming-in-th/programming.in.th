import React from 'react'
import Highlight, { Prism } from 'prism-react-renderer'
;((typeof global !== 'undefined' ? global : window) as any).Prism = Prism

require('prismjs/components/prism-rust')
require('prismjs/components/prism-java')

export interface CodeBlockProps {
  code: string
  language: string
}

export const Code = ({ code, language }: CodeBlockProps) => {
  return (
    <Highlight Prism={Prism} code={code} language={language as any}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={{ ...style }}
          className={`overflow-y-auto	text-xs	language-${language}`}
        >
          <code className={`language-${language}`}>
            {tokens.map((line, i) => (
              <tr key={i} {...getLineProps({ line, key: i })}>
                <td
                  key={i + 'l'}
                  className="w-8 pr-2 text-gray-400 select-none"
                >
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

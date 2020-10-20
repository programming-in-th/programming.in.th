import React from 'react'
import Highlight, { Prism } from 'prism-react-renderer'
;((typeof global !== 'undefined' ? global : window) as any).Prism = Prism

require('prismjs/components/prism-rust')

export interface CodeBlockProps {
  code: string
  language: string
}

export const Code = ({ code, language }: CodeBlockProps) => {
  return (
    <Highlight Prism={Prism} code={code} language={language as any}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`language-${language} overflow-y-auto text-sm`}
          style={{ ...style }}
        >
          <code className={`language-${language}`}>
            {tokens.map((line, i) => (
              <tr
                key={i}
                className="table-row"
                {...getLineProps({ line, key: i })}
              >
                <td
                  key={i + 'l'}
                  className="table-cell pr-2 select-none w-8 text-gray-500"
                >
                  {i + 1}
                </td>
                <td className="table-cell">
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

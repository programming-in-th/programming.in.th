import Highlight, { Language, Prism } from 'prism-react-renderer'
;(
  (typeof global !== 'undefined' ? global : window) as unknown as {
    Prism: typeof Prism
  }
).Prism = Prism

require('prismjs/components/prism-rust')
require('prismjs/components/prism-java')

export interface CodeBlockProps {
  code: string
  language: string
  maxHeight?: string
}

// Direct port of https://github.com/programming-in-th/programming.in.th/blob/main/src/components/Code.tsx
// May cause bug
const Code = ({ code, language, maxHeight = 'auto' }: CodeBlockProps) => {
  return (
    <div className="py-2">
      <Highlight Prism={Prism} code={code} language={language as Language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={{ ...style, maxHeight }}
            className={`language-${language} overflow-y-auto rounded-lg text-[13.6px]`}
          >
            <code className={`language-${language}`}>
              {tokens.map((line, i) => (
                <tr key={i} {...getLineProps({ line, key: i })}>
                  <td className="w-8 select-none pr-2 text-gray-500">
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
    </div>
  )
}

export default Code

export const CodeSkeleton = () => (
  <div className="my-[0.5em] h-[48rem] w-full overflow-y-auto rounded-lg bg-[#011627]"></div>
)

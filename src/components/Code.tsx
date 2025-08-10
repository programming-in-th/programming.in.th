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

const Code = ({ code, language, maxHeight = 'auto' }: CodeBlockProps) => {
  return (
    <div className="py-2">
      <Highlight Prism={Prism} code={code} language={language as Language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <div
            style={{ ...style, maxHeight }}
            className={`language-${language} overflow-y-auto rounded-lg text-[13.6px]`}
          >
            <code className={`language-${language}`}>
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line, key: i })}
                  className="flex"
                >
                  <span className="w-8 select-none pr-2 text-gray-500">
                    {i + 1}
                  </span>
                  <span className="flex-1">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </span>
                </div>
              ))}
            </code>
          </div>
        )}
      </Highlight>
    </div>
  )
}

export default Code

export const CodeSkeleton = () => (
  <div className="my-[0.5em] h-[48rem] w-full overflow-y-auto rounded-lg bg-[#011627]"></div>
)

import { Highlight, Prism, type PrismTheme } from 'prism-react-renderer'
;(
  (typeof global !== 'undefined' ? global : window) as unknown as {
    Prism: typeof Prism
  }
).Prism = Prism

// Java isn't bundled; must run after the global Prism above is set, which
// imports would hoist past.
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('prismjs/components/prism-java')

// Colors come from the .token rules in index.css, not a theme.
const noTheme: PrismTheme = { plain: {}, styles: [] }

export interface CodeBlockProps {
  code: string
  language: string
  maxHeight?: string
}

const Code = ({ code, language, maxHeight = 'auto' }: CodeBlockProps) => {
  return (
    <div className="py-2">
      <Highlight theme={noTheme} code={code} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <div
            style={{ ...style, maxHeight }}
            className={`language-${language} overflow-y-auto rounded-lg`}
          >
            <code className={`language-${language}`}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="flex">
                  <span className="w-8 pr-2 text-gray-500 select-none">
                    {i + 1}
                  </span>
                  <span className="flex-1">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
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
  <div className="my-[0.5em] h-192 w-full overflow-y-auto rounded-lg bg-[#011627]"></div>
)

import Prism from 'prismjs'

require(`prismjs/components/prism-c.js`)
require(`prismjs/components/prism-cpp.js`)
require(`prismjs/components/prism-python.js`)
require(`prismjs/components/prism-java.js`)
require(`prismjs/components/prism-rust.js`)

const escapeHtml = (code) => {
  const htmlEscapes = {
    '&': `&amp;`,
    '>': `&gt;`,
    '<': `&lt;`,
    '"': `&quot;`,
    "'": `&#39;`,
  }

  const escapedChars = (char) => htmlEscapes[char]
  const chars = Object.keys(htmlEscapes)
  const charsRe = new RegExp(`[${chars.join(``)}]`, `g`)
  const rehasUnescapedChars = new RegExp(charsRe.source)

  return code && rehasUnescapedChars.test(code)
    ? code.replace(charsRe, escapedChars)
    : code
}

export const generateHtml = ({
  code = '',
  language = 'text',
  highlightLines = [],
  lineNumber = false,
}) => {
  let highlightCode = ''

  try {
    highlightCode = Prism.highlight(code, Prism.languages[language], language)
  } catch {
    highlightCode = escapeHtml(code)
  }

  if (highlightCode[highlightCode.length - 1] == '\n') {
    highlightCode = highlightCode.slice(0, -1)
  }

  const codeLine = highlightCode.split('\n')

  let result = ``

  codeLine.forEach((element, index) => {
    if (element == '') {
      element = ' '
    }

    if (highlightLines.includes(index + 1)) {
      // prettier-ignore
      element = ``
      + `<span class="highlight-code-line">`
      +   element
      + `</span>`
    }

    result += element

    if (
      !(
        highlightLines.includes(index + 1) || highlightLines.includes(index + 2)
      )
    ) {
      result += '\n'
    }
  })
  // prettier-ignore
  result = ``
  + `<code class="language-${language}">`
  +   result
  + `</code>`

  if (lineNumber) {
    // prettier-ignore
    result += `` 
    + `<span class="line-numbers-rows">`
    +   codeLine.map(() => `<span></span>`).join('')
    + `</span>`
  }

  return result
}

import visit from 'unist-util-visit'
import refractor from 'refractor'
import nodeToString from 'hast-util-to-string'
import rangeParser from 'parse-numeric-range'

const parseOption = (language: string) => {
  let highlightLines = []
  let spilitLanguage = language
  let options = []

  if (language.split('{').length > 1) {
    ;[spilitLanguage, ...options] = language.split('{')
    options.forEach((option) => {
      option = option.slice(0, -1)
      const splitOption = option.replace(/ /g, ``).split(`:`)

      if (splitOption.length === 1 && rangeParser(option).length > 0) {
        highlightLines = rangeParser(option).filter((n) => n > 0)
      }
    })
  }
  return {
    spilitLanguage,
    highlightLines,
  }
}

const getLanguageOption = (node) => {
  const className = node.properties.className || []
  for (const classListItem of className) {
    if (classListItem.slice(0, 9) === 'language-') {
      return parseOption(classListItem.slice(9))
    }
  }
}

const piper = (node, index, parent) => {
  if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
    return
  }

  const { spilitLanguage, highlightLines } = getLanguageOption(node)

  parent.properties.className = (parent.properties.className || []).concat(
    'language-' + spilitLanguage
  )
  for (let i = 0; i < node.properties.className.length; ++i) {
    if (node.properties.className[i].slice(0, 9) === 'language-') {
      node.properties.className = 'language-' + spilitLanguage
    }
  }
  const codeLine = nodeToString(node).split('\n')
  let result = []
  codeLine.slice(0, -1).forEach((element, index) => {
    const childElem = refractor.highlight(element, spilitLanguage)
    if (highlightLines.includes(index + 1)) {
      result.push({
        type: 'element',
        tagName: 'span',
        properties: {
          className: ['highlight-code-line'],
        },
        children: childElem,
      })
    } else {
      result = [...result, ...childElem]
    }
    if (
      !(
        highlightLines.includes(index + 1) || highlightLines.includes(index + 2)
      )
    ) {
      result = [...result, { type: 'text', value: '\n' }]
    }
  })

  node.children = result
}

const highlight: () => any = () => {
  return (tree) => {
    visit(tree, 'element', piper)
  }
}

export default highlight

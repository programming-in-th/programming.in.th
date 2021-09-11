import { visit } from 'unist-util-visit'
import { generateHtml } from 'lib/prism'
import { toString } from 'hast-util-to-string'
import rangeParser from 'parse-numeric-range'

const getOptions = (node) => {
  let highlightLines = []
  let lineNumber = false
  if (node.data) {
    const data = node.data.meta
    if (data.split('{').length > 1) {
      const options = data.split('{')
      options.forEach((option) => {
        option = option.slice(0, -1)
        const splitOption = option.replace(/ /g, ``).split(`:`)

        if (splitOption.length === 1 && rangeParser(option).length > 0) {
          highlightLines = rangeParser(option).filter((n) => n > 0)
        }

        if (
          splitOption.length === 2 &&
          splitOption[0] === `lineNumber` &&
          splitOption[1].trim() === `true`
        ) {
          lineNumber = true
        }
      })
    }
  }

  return {
    highlightLines,
    lineNumber,
  }
}

const getLanguage = (node) => {
  const className = node.properties.className
  for (const classListItem of className) {
    if (classListItem.slice(0, 9) === 'language-') {
      return classListItem.slice(9).toLowerCase()
    }
  }
}

const piper = (node, index, parent) => {
  if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
    return
  }

  if (!node.properties.className) {
    node.properties.className = ['language-']
  }

  const language = getLanguage(node)
  const { highlightLines, lineNumber } = getOptions(node)

  parent.properties.className = (parent.properties.className || []).concat(
    'language-' + language
  )
  for (let i = 0; i < node.properties.className.length; ++i) {
    if (node.properties.className[i].slice(0, 9) === 'language-') {
      node.properties.className = 'language-' + language
    }
  }

  parent.children = [
    {
      type: 'raw',
      value: generateHtml({
        code: toString(node),
        language,
        highlightLines,
        lineNumber,
      }),
    },
  ]

  if (lineNumber) {
    parent.properties.className.push('line-numbers')
  }
}

const highlight: () => any = () => {
  return (tree) => {
    visit(tree, 'element', piper)
  }
}

export default highlight

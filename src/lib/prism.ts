import { visit } from 'unist-util-visit'
import { refractor } from 'refractor'
import { toString } from 'hast-util-to-string'
import rangeParser from 'parse-numeric-range'

const getOptions = (node) => {
  let highlightLines = []
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
      })
    }
  }

  return {
    highlightLines,
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
  const { highlightLines } = getOptions(node)

  parent.properties.className = (parent.properties.className || []).concat(
    'language-' + language
  )
  for (let i = 0; i < node.properties.className.length; ++i) {
    if (node.properties.className[i].slice(0, 9) === 'language-') {
      node.properties.className = 'language-' + language
    }
  }
  const codeLine = toString(node).split('\n')
  let result = []
  codeLine.slice(0, -1).forEach((element, index) => {
    if (element === '') element = ' '
    let childElem
    try {
      childElem = refractor.highlight(element, language).children
    } catch {
      childElem = [{ type: 'text', value: element }]
    }

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

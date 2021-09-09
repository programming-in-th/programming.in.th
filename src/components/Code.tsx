import React, { useEffect, useState } from 'react'
import { renderMarkdown } from 'lib/renderMarkdown'

export const Code = ({ code, language }) => {
  const [data, setData] = useState<string>('')
  useEffect(() => {
    renderMarkdown(
      `\`\`\`${language} \{lineNumber: true\}\n${code}\`\`\``
    ).then((response) => {
      setData(response)
    })
  }, [code, language])

  return <div dangerouslySetInnerHTML={{ __html: data }} />
}

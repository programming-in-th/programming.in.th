import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

import { cpp } from '@codemirror/lang-cpp'
import { java } from '@codemirror/lang-java'
import { python } from '@codemirror/lang-python'
import { rust } from '@codemirror/lang-rust'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { ReactCodeMirrorProps, useCodeMirror } from '@uiw/react-codemirror'

const extensions = [cpp(), python(), java(), rust()]

const CodeEditor = (
  props: {
    setValue: Dispatch<SetStateAction<string | undefined>>
    value: string | undefined
  } & ReactCodeMirrorProps
) => {
  const { setValue, value, ...restProps } = props
  const handleChange = (value: string) => {
    setValue(value)
  }

  const editor = useRef<HTMLDivElement>(null)
  const { setContainer } = useCodeMirror({
    container: editor.current,
    theme: dracula,
    onChange: handleChange,
    extensions,
    value,
    ...restProps
  })

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current)
    }
  }, [editor, setContainer])

  return <div ref={editor} />
}

export default CodeEditor

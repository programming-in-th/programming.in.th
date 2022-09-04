import { ReactCodeMirrorProps, useCodeMirror } from '@uiw/react-codemirror'
import { cpp } from '@codemirror/lang-cpp'
import { python } from '@codemirror/lang-python'
import { java } from '@codemirror/lang-java'
import { rust } from '@codemirror/lang-rust'
import { StreamLanguage } from '@codemirror/language'
import { go } from '@codemirror/legacy-modes/mode/go'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

const extensions = [cpp(), python(), java(), rust(), StreamLanguage.define(go)]

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
  const { setContainer, state } = useCodeMirror({
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
  }, [editor.current])

  return <div ref={editor} />
}

export default CodeEditor

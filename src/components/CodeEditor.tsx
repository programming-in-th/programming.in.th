import {
  UnControlled as CodeMirror,
  Controlled as CodeMirrorDisplay
} from 'react-codemirror2'
import styled from 'styled-components'

import 'codemirror/lib/codemirror.css'

import 'codemirror/theme/monokai.css'
import 'codemirror/theme/solarized.css'
import 'codemirror/theme/material.css'

if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  require('codemirror/mode/clike/clike.js')
  require('codemirror/mode/python/python.js')

  require('codemirror/addon/selection/active-line.js')
  require('codemirror/addon/fold/foldgutter.css')
  require('codemirror/addon/fold/foldgutter.js')
  require('codemirror/addon/fold/brace-fold.js')
  require('codemirror/addon/fold/indent-fold.js')
}

export const Code = styled(CodeMirror)`
  font-family: Fira Code !important;
  margin: 15px 0;
  span {
    font-family: Fira Code !important;
  }
`

export const CodeDisplay = styled(CodeMirrorDisplay)`
  font-family: Fira Code !important;
  margin: 15px 0;
  span {
    font-family: Fira Code !important;
  }
`

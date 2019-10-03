import { UnControlled as CodeMirror } from 'react-codemirror2'
import styled from 'styled-components'

import 'codemirror/lib/codemirror.css'

import 'codemirror/addon/selection/active-line.js'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/indent-fold.js'

import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/python/python.js'

import 'codemirror/theme/monokai.css'
import 'codemirror/theme/solarized.css'
import 'codemirror/theme/material.css'

export const Code = styled(CodeMirror)`
  font-family: Fira Code !important;

  span {
    font-family: Fira Code !important;
  }
`

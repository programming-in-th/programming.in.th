import styled from 'styled-components'
import {
  MARGIN_BOTTOM,
  getSystemFonts,
  TEXT_COLOR,
  BASE_FONT_SIZE
} from '../../Design'

export const Ol = styled.ol`
  margin-bottom: ${MARGIN_BOTTOM};
  font-family: ${getSystemFonts().join(', ')};
  font-size: ${BASE_FONT_SIZE};
  color: ${TEXT_COLOR};
`

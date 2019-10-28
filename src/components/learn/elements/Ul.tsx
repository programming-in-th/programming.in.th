import styled from 'styled-components'
import { BASE_FONT_SIZE, getSystemFonts, TEXT_COLOR } from '../../../design'

export const Ul = styled.ul`
  font-size: ${BASE_FONT_SIZE};
  font-family: ${getSystemFonts().join(', ')};
  color: ${TEXT_COLOR};
`

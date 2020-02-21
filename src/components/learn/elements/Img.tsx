import styled from 'styled-components'
import { SimpleImg, Props as SimpleImgProps } from 'react-simple-img'

const Image = (props: SimpleImgProps) => <SimpleImg height="100%" {...props} />

export const Img = styled(Image)`
  max-width: 100%;
`

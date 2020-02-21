import { SimpleImg, Props as SimpleImgProps } from 'react-simple-img'

export const Img = (props: SimpleImgProps) => (
  <SimpleImg imgStyle={{ maxWidth: '100%', objectFit: 'contain' }} {...props} />
)

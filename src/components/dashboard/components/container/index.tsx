import './container.styl'

import ContainerComponent from './types'

const Container: ContainerComponent = ({ children, height = false }) => (
  <section
    className="container"
    style={{ height: height ? (height as number) + 40 : 'auto' }}
  >
    {children}
  </section>
)

export default Container

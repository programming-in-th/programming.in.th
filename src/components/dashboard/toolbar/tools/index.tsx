import { Fragment } from 'react'

import Slot from './slot'
import { NotificationIcon, SingleLayoutIcon, MultiLayoutIcon } from './icon'

const Tools = () => {
  return (
    <Fragment>
      <Slot>
        <NotificationIcon />
      </Slot>
      <Slot>
        <SingleLayoutIcon />
      </Slot>
      <Slot>
        <MultiLayoutIcon />
      </Slot>
    </Fragment>
  )
}

export default Tools

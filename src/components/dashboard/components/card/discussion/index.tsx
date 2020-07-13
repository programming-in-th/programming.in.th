import Card from '../base'
import { Fragment } from 'react'

import DiscussionCardComponent from './types'

import './discussion.styl'

const DiscussionCard: DiscussionCardComponent = ({
  title,
  children,
  href,
  by: { name, image }
}) => (
  <Card
    {...{ title, children, href }}
    footer={
      <Fragment>
        <img className="image" src={image} />
        <p className="name">{name}</p>
      </Fragment>
    }
  />
)

export default DiscussionCard

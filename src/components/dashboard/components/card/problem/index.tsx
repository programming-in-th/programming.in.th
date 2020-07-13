import { Fragment } from 'react'

import Card from '../base'

import ProblemCardComponent from './types'

import './problem.styl'

const ProblemCard: ProblemCardComponent = ({
  title,
  children,
  href,
  level
}) => (
  <Card
    {...{ title, children, href }}
    footer={
      <Fragment>
        <div className={`level -${level}`} />
        <p className="name">{level}</p>
      </Fragment>
    }
  />
)

export default ProblemCard

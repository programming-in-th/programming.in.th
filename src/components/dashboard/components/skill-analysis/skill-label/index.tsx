import { Fragment } from 'react'

import { labels } from '..'

import './skill-label.styl'

const SkillLabel = ({ data }: { data: number[] }) => (
  <section className="skill-label">
    <Fragment>
      {labels.map((label, index) => (
        <p className="label" key={label}>
          {label}: {data[index]}
        </p>
      ))}
    </Fragment>
  </section>
)

export default SkillLabel

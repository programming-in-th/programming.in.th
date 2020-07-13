import { Fragment } from 'react'

import dynamic from 'next/dynamic'

import Container from '../container'
import SkillLabel from './skill-label'

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

export const labels = [
  'Runtime',
  'Memory Usage',
  'Code Quality',
  'Pass-failed Ratio',
  'Code Golf',
  'Ranking'
]

const SkillAnalysis = ({ data }: { data: number[] }) => {
  const series = [
      {
        name: 'Skill analysis',
        data: data
      }
    ],
    options = {
      chart: {
        type: 'radar'
      },
      xaxis: {
        categories: labels
      },
      labels,
      yaxis: {
        max: 100,
        min: 0,
        tickAmount: 4
      },
      title: {
        text: 'Overall'
      }
    }

  return (
    <Container>
      <Fragment>
        <ApexChart {...{ series, options }} type="radar" height={400} />
        <SkillLabel data={data} />
      </Fragment>
    </Container>
  )
}

export default SkillAnalysis

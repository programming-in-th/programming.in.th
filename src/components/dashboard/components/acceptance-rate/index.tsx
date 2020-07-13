import { Fragment } from 'react'

import dynamic from 'next/dynamic'

import Container from '../container'

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

const AcceptanceRate = ({ data }) => {
  const options = {
    chart: {
      height: 350,
      type: 'line'
    },
    title: {
      text: 'Acceptance Rate',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      }
    },
    tooltip: {
      enabled: true
    },
    xaxis: {
      type: 'category'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  }

  return (
    <Container>
      <Fragment>
        <ApexChart {...{ options }} series={data} type="line" height={400} />
      </Fragment>
    </Container>
  )
}

export default AcceptanceRate

import { Fragment } from 'react'

import dynamic from 'next/dynamic'

import Container from '../container'

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

import './level-activity.styl'

/**
 * * Level Activities
 * ? Indicate user's total cleared problems by percentage.
 */
const LevelActivity = ({ data }: { data: number[] }) => {
  const options = {
    chart: {
      type: 'bar'
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    dataLabels: {
      enabled: true
    },
    xaxis: {
      categories: ['Easy', 'Medium', 'Hard'],
      min: 0,
      max: 100
    },
    tooltip: {
      y: {
        title: {
          formatter: () => ''
        }
      }
    }
  }

  return (
    <Container>
      <Fragment>
        <section className="activity-label">
          <div className="activity">
            <p className="percent">{data[0]}%</p>
            <p className="label">Easy</p>
          </div>
          <div className="activity">
            <p className="percent">{data[1]}%</p>
            <p className="label">Medium</p>
          </div>
          <div className="activity">
            <p className="percent">{data[2]}%</p>
            <p className="label">Hard</p>
          </div>
        </section>
        <ApexChart
          {...{ options }}
          series={[{ data }]}
          height={200}
          type="bar"
        />
      </Fragment>
    </Container>
  )
}

export default LevelActivity

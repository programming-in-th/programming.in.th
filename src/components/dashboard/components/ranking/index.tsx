import dynamic from 'next/dynamic'

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

import Container from '../container'

const data = {
  series: [
    {
      name: 'Ranking',
      data: new Array(30)
        .fill(null)
        .map(() => (Math.random() * 5000 + 3000).toFixed(0))
    }
  ],
  options: {
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: new Array(30)
        .fill(null)
        .map((_, index) =>
          new Date().setDate(new Date().getDate() - (30 - index))
        )
    },
    yaxis: {
      reversed: true,
      min: 1,
      max: 15000,
      tickAmount: 6
    },
    tooltip: {
      x: {
        format: 'dd/MM/yyyy'
      }
    }
  }
}

const height = 400

const Ranking = () => (
  <Container height={height}>
    <ApexChart
      options={data.options}
      series={data.series}
      type="area"
      height={height}
    />
  </Container>
)

export default Ranking

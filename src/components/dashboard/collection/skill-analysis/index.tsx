import dynamic from 'next/dynamic'

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const SkillAnalysis = () => {
  const series = [
      {
        name: 'Skill analysis',
        data: [80, 50, 30, 40, 100, 20]
      }
    ],
    options = {
      chart: {
        width: 380,
        height: 350,
        type: 'radar'
      },
      title: {
        text: 'Skill Analysis'
      },
      xaxis: {
        categories: [
          'Level',
          'Performance',
          'Memory Usage',
          'Correctness',
          'Code Quality',
          'Algorithms'
        ]
      },
      yaxis: {
        max: 100,
        min: 0,
        tickAmount: 4
      }
    }

  return (
    <ApexChart {...{ series, options }} type="radar" width={380} height={350} />
  )
}

export default SkillAnalysis

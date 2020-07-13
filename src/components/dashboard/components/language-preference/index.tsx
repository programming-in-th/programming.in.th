import dynamic from 'next/dynamic'

import Container from '../container'

import LanguagePreferenceComponent from './types'

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

/**
 * * Language Prefernece
 * ? Indicate user's language perference.
 */
const LanguagePreference: LanguagePreferenceComponent = ({ data }) => {
  let options = {
    labels: data.map(skill => skill.label),
    title: {
      text: 'Language Preference'
    }
  }

  return (
    <Container>
      <ApexChart
        {...{ options }}
        series={data.map(skill => skill.value)}
        type="donut"
        height={450}
      />
    </Container>
  )
}

export default LanguagePreference

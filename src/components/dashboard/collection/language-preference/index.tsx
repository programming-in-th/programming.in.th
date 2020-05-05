import { useState, useEffect, useRef } from 'react'

import dynamic from 'next/dynamic'

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const LanguagePreference = () => {
  let [width, updateWidth] = useState(0),
    card = useRef()

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof card === 'undefined' ||
      typeof card.current === 'undefined'
    )
      return

    updateWidth((card.current as HTMLElement).parentElement.offsetWidth - 40)

    let updateHandler = () => {
      if (
        typeof window === 'undefined' ||
        typeof card === 'undefined' ||
        typeof card.current === 'undefined'
      )
        return

      let reference = card.current as HTMLElement

      reference.style.display = 'none'
      updateWidth(reference.parentElement.offsetWidth - 40)
      reference.style.display = 'block'
    }

    window.addEventListener('resize', updateHandler, true)

    return () => window.removeEventListener('resize', updateHandler, true)
  }, [])

  let series = [44, 55, 13],
    options = {
      chart: {
        width: 380,
        type: 'pie'
      },
      labels: ['C++', 'Python', 'JavaScript'],
      title: {
        text: 'Language Preference'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    }

  return (
    <div ref={card}>
      <ApexChart
        {...{ series, options }}
        type="pie"
        width={width}
        height={320}
      />
    </div>
  )
}

export default LanguagePreference

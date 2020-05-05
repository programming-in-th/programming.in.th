import { useState, useEffect, useRef } from 'react'

import dynamic from 'next/dynamic'

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const CodeFrequent = () => {
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

  let series = [
      {
        name: 'This Week',
        data: [31, 40, 28, 51, 42, 109, 100]
      },
      {
        name: 'Last Week',
        data: [11, 32, 45, 32, 34, 52, 41]
      }
    ],
    options = {
      chart: {
        width: width,
        height: 320,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Code Frequent'
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z'
        ]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        }
      }
    }

  return (
    <div ref={card}>
      <ApexChart
        {...{ series, options }}
        type="area"
        width={width}
        height={320}
      />
    </div>
  )
}

export default CodeFrequent

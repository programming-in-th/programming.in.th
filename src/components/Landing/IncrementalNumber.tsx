import { useRef } from 'react'

import CountUp from 'react-countup'

import useInViewport from '@/lib/useInViewport'

interface IncrementalNumberProps {
  start: number
  end: number
}

export const IncrementalNumber = ({ start, end }: IncrementalNumberProps) => {
  const childRefContainer = useRef<HTMLDivElement>(null)
  const isRendered = useInViewport(childRefContainer)

  return (
    <p ref={childRefContainer}>
      {isRendered ? (
        <CountUp
          start={start}
          end={end}
          duration={2}
          delay={0}
          useEasing={true}
          separator=","
        >
          {({ countUpRef }) => <span ref={countUpRef} />}
        </CountUp>
      ) : (
        <span>0</span>
      )}
    </p>
  )
}

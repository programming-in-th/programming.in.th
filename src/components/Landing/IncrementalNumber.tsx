import { RefObject, useEffect, useReducer, useRef } from 'react'

import CountUp from 'react-countup'

interface IncrementalNumberProps {
  start: number
  end: number
}

export const IncrementalNumber = ({ start, end }: IncrementalNumberProps) => {
  const interactive = useRef<HTMLDivElement>(null)
  const [isShowingInterative, showInteractive] = useReducer(() => true, false)

  useEffect(() => {
    const detectInteractive = () => {
      if (
        typeof interactive.current === 'undefined' ||
        interactive.current === null
      )
        return
      let interactivePosition = interactive.current.getBoundingClientRect().top
      if (interactivePosition === 0) return
      if (interactivePosition > window.innerHeight / 2) return
      showInteractive()
      window.removeEventListener('scroll', detectInteractive)
    }

    window.addEventListener('scroll', detectInteractive, {
      passive: true
    })

    detectInteractive()

    return () => window.removeEventListener('scroll', detectInteractive)
  }, [])

  return (
    <p ref={interactive}>
      {isShowingInterative ? (
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

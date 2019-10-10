import React from 'react'
import { useSpring } from 'react-spring'
import { AnimatedTitle } from './atomics'

export const IncreasingNumber: React.FunctionComponent<{}> = () => {
  const spring = useSpring({ val: 400, from: { val: 0 } })

  return (
    <AnimatedTitle>
      {spring.val.interpolate(val => Math.floor(val))}
    </AnimatedTitle>
  )
}

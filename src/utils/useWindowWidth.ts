import { useEffect, useState } from 'react'

export const useWindowSize = (
  initialWidth = Infinity,
  initialHeight = Infinity
) => {
  const [state, setState] = useState<{ width: number; height: number }>({
    width: typeof window === 'object' ? window.innerWidth : initialWidth,
    height: typeof window === 'object' ? window.innerHeight : initialHeight
  })

  useEffect(() => {
    if (typeof window === 'object') {
      const handler = () => {
        setState({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }
      window.addEventListener('resize', handler)
      return () => window.removeEventListener('resize', handler)
    } else {
      return undefined
    }
  }, [])

  return state
}

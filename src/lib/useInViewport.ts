import { useState, useEffect } from 'react'

const useInViewport = (ref: any) => {
  const [isInViewport, setIsInViewport] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsLoaded(true)
      }

      setIsInViewport(entry.isIntersecting)
    })

    if (ref.current) {
      observer.observe(ref.current)
    }
  }, [ref])

  return isInViewport || isLoaded
}

export default useInViewport

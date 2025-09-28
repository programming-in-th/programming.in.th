import { RefObject, useEffect, useState } from 'react'

export const useDetectOuside = (
  ref: RefObject<HTMLElement | null>,
  dep: boolean,
  callback: () => void
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node | null) &&
        dep
      ) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, dep, callback])
}

export function useWindowDimensions() {
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window
    return { width, height }
  }

  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    setWindowDimensions(getWindowDimensions())

    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

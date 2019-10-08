import React, { useState, useEffect } from 'react'

interface IDesktopOnlyProps {
  breakpoint?: number
  children: React.ReactNode
}

export const DesktopOnly = ({
  breakpoint = 1020,
  children
}: IDesktopOnlyProps) => {
  const width = useWindowWidth()
  if (width > breakpoint) {
    return children as React.ReactElement
  } else {
    return null
  }
}

function useWindowWidth() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const listener = () => setWidth(window.innerWidth)
    window.addEventListener('resize', listener)
    listener()
    return () => window.removeEventListener('resize', listener)
  }, [])
  return width
}

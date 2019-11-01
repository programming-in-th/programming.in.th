import React, { useState, useEffect } from 'react'

interface IDesktopOnlyProps {
  breakpoint?: number
  children: React.ReactNode
}

const defaultBreak: number = 992

const breakpoints = {
  phone_sm: 320,
  phone: 376,
  phablet: 540,
  tablet: 735,
  desktop: 1070,
  desktop_md: 1280,
  desktop_lg: 1440
}

export const media = (type: string) => {
  return `@media (max-width: ${breakpoints[type]})`
}

export const responsive = `max-width: ${defaultBreak}px`

export const DesktopOnly = ({
  breakpoint = defaultBreak,
  children
}: IDesktopOnlyProps) => {
  const width = useWindowWidth()
  if (width > breakpoint) {
    return children as React.ReactElement
  } else {
    return null
  }
}

export const MobileOnly = ({
  breakpoint = defaultBreak,
  children
}: IDesktopOnlyProps) => {
  const width = useWindowWidth()
  if (width > breakpoint) {
    return null
  } else {
    return children as React.ReactElement
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

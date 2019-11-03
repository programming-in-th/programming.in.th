import React, { useState, useEffect } from 'react'

interface IDesktopOnlyProps {
  breakpoint?: number
  children: React.ReactNode
}

const defaultBreak: number = 992

const breakpoints = {
  PHONE_SM: 320,
  PHONE: 376,
  PHABLET: 540,
  TABLET: 768,
  IPAD_PRO: 1024,
  DESKTOP: 1070,
  DESKTOP_MD: 1280,
  DESKTOP_LG: 1440
}

type MediaType =
  | 'PHONE_SM'
  | 'PHONE'
  | 'PHABLET'
  | 'TABLET'
  | 'IPAD_PRO'
  | 'DESKTOP'
  | 'DESKTOP_MD'
  | 'DESKTOP_LG'

export const media = (type: MediaType) => {
  return `@media (max-width: ${breakpoints[type]}px)`
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

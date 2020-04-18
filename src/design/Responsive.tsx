import React from 'react'
import { useWindowSize } from 'react-use'

interface IOnlyProps {
  breakpoint?: number
  children: React.ReactNode
}

export const DesktopOnly = ({ breakpoint = 1070, children }: IOnlyProps) => {
  const { width } = useWindowSize()
  if (width >= breakpoint) {
    return children as React.ReactElement
  } else {
    return null
  }
}

export const MobileOnly = ({ breakpoint = 1070, children }: IOnlyProps) => {
  const { width } = useWindowSize()
  if (width >= breakpoint) {
    return null
  } else {
    return children as React.ReactElement
  }
}

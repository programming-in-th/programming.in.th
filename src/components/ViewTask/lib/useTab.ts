import { Task } from '@/types/tasks'
import { useCallback, useState } from 'react'
import { TTabType } from './types'

export const useTab = () => {
  const [tab, setTab] = useState<TTabType>('statement')

  const changeTab = useCallback((newTab: TTabType) => setTab(newTab), [])

  return {
    tab,
    changeTab
  }
}

import { useMemo } from 'react'

import { usePathname } from 'next/navigation'

/**
 * Get first segment of pathname (location) for example:
 * `/login` => `login`, `/tasks` => `tasks`, `/tasks/69420` => `tasks`
 */
export function useLocation() {
  const pathname = usePathname()

  const location = useMemo(() => {
    return pathname.split('/')[1]
  }, [pathname])

  return location
}

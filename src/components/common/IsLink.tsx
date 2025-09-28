import type { JSX } from 'react'

import Link from 'next/link'

const LinkComponent = ({
  children,
  className = '',
  href,
  isLink = false
}: {
  children: JSX.Element
  className?: string
  href: string
  isLink?: boolean
}) => {
  if (isLink) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }
  return <div className={className}>{children}</div>
}

export default LinkComponent

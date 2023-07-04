import { PropsWithChildren } from 'react'

import Image from 'next/image'
import Link from 'next/link'

type MDXComponentProps = PropsWithChildren & {
  className: string
  href: string
  src: string
  alt: string
}

const CustomLink = (props: MDXComponentProps) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link {...{ ...props, href, className: 'dark:text-white' }}>
        {props.children}
      </Link>
    )
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

const CustomImage = (props: MDXComponentProps) => {
  return (
    <Image
      {...{ ...props, alt: props.alt }}
      style={{
        maxWidth: '100%',
        height: 'auto'
      }}
    />
  )
}

const CustomCode = (props: MDXComponentProps) => {
  if (
    typeof props.className === 'string' &&
    props.className.includes('code-highlight')
  ) {
    return <>{props.children}</>
  } else {
    return <code className="text-black dark:text-white">{props.children}</code>
  }
}

const MDXComponent = {
  Image: CustomImage,
  a: CustomLink,
  code: CustomCode
}

export default MDXComponent

import type { JSX } from 'react'

import Image, { ImageProps } from 'next/image'
import Link, { LinkProps } from 'next/link'

const CustomLink = (props: JSX.IntrinsicElements['a']) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link {...(props as LinkProps)} className="dark:text-white">
        {props.children}
      </Link>
    )
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

const CustomImage = (props: JSX.IntrinsicElements['img']) => {
  return (
    <Image
      {...(props as ImageProps)}
      alt={props.alt ?? ''}
      style={{
        maxWidth: '100%',
        height: 'auto'
      }}
    />
  )
}

const CustomCode = (props: JSX.IntrinsicElements['code']) => {
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

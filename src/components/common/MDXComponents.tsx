import Link from 'next/link'

import Image from 'next/image'

const CustomLink = (props: any) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

const CustomImage = (props: any) => {
  return (
    <Image
      alt={props.alt}
      {...props}
      style={{
        maxWidth: '100%',
        height: 'auto'
      }}
    />
  )
}

const MDXComponent = {
  Image: CustomImage,
  a: CustomLink
}

export default MDXComponent

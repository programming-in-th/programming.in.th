import Image from 'next/image'
import Link from 'next/link'

const CustomLink = props => {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    )
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

const CustomImage = props => {
  return <Image alt={props.alt} {...props} />
}

const MDXComponent = {
  Image: CustomImage,
  a: CustomLink
}

export default MDXComponent

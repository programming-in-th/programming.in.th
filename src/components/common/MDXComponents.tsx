import Image from 'next/image'
import Link from 'next/link'

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
      width="0"
      height="0"
      sizes="100vw"
      className="h-auto w-full"
    />
  )
}

const MDXComponent = {
  img: CustomImage,
  a: CustomLink
}

export default MDXComponent

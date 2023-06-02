import Image from 'next/image'
import Link from 'next/link'

const CustomLink = (props: any) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link href={href} className="dark:text-white" {...props}>
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

const CustomCode = (props: any) => {
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

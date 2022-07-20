import { QuoteVector } from '@/vectors/Quote'
import Image from 'next/image'
import { FC } from 'react'

export const TestimonyCard: FC<{
  title: string
  description: string
  imgURL: string
  role: string
}> = props => {
  const { title, description, imgURL, role } = props

  return (
    <article className="text-center py-4 relative bg-white text-prog-gray-500 rounded-lg">
      <QuoteVector className="mx-auto mb-4" />
      <p className="px-12 font-light">{description}</p>
      <div className="flex gap-4 items-center justify-center py-6">
        <Image
          width={80}
          height={80}
          className="rounded-full object-cover"
          src={imgURL}
          alt={title}
        />

        <div className="mb-4 pt-2 text-left flex flex-col">
          <h3 className="font-semibold">{title}</h3>
          <span className="text-prog-primary-500">{role}</span>
        </div>
      </div>
    </article>
  )
}

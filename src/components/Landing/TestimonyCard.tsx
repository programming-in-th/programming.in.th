import { QuoteVector } from '@/svg/Quote'
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
    <article className="relative py-4 text-center bg-white rounded-lg text-prog-gray-500">
      <QuoteVector className="mx-auto mb-4" />
      <p className="h-auto px-12 font-light sm:h-48 md:h-36">{description}</p>
      <div className="flex items-center justify-center gap-4 py-6">
        <Image
          width={80}
          height={80}
          className="object-cover rounded-full"
          src={imgURL}
          alt={title}
        />

        <div className="flex flex-col pt-2 mb-4 text-left">
          <h3 className="mb-1 font-semibold">{title}</h3>
          <span className="w-48 text-sm whitespace-pre-wrap text-prog-primary-500">
            {role}
          </span>
        </div>
      </div>
    </article>
  )
}

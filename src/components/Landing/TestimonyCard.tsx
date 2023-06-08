import Image from 'next/image'

import { QuoteVector } from '@/svg/Quote'

export const TestimonyCard = (props: {
  title: string
  description: string
  imgURL: string
  role: string
}) => {
  const { title, description, imgURL, role } = props

  return (
    <article className="relative rounded-lg bg-white p-3 py-4 text-center text-prog-gray-500 dark:bg-slate-700 dark:text-gray-100">
      <QuoteVector className="mx-auto mb-4" />
      <p className="h-auto px-12 font-light sm:h-48 md:h-36">{description}</p>
      <div className="flex items-center justify-center gap-4 py-6">
        <Image
          width={80}
          height={80}
          className="rounded-full object-cover"
          src={imgURL}
          alt={title}
          style={{
            maxWidth: '100%',
            height: 'auto'
          }}
        />

        <div className="mb-4 flex flex-col pt-2 text-left">
          <h3 className="mb-1 font-semibold">{title}</h3>
          <span className="w-48 whitespace-pre-wrap text-sm text-prog-primary-500">
            {role}
          </span>
        </div>
      </div>
    </article>
  )
}

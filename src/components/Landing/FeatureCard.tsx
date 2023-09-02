import { ReactNode } from 'react'

export const FeatureCard = ({
  title,
  description,
  Icon
}: {
  title: string
  description: string
  Icon: (_props: { className: string }) => ReactNode
}) => {
  return (
    <article className="relative rounded-lg bg-white py-6 text-center text-prog-gray-500 shadow-lg dark:bg-slate-700">
      <div className="absolute -top-6 left-1/2 inline-block -translate-x-1/2 rounded-md bg-prog-primary-500 p-4 shadow-lg">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="flex flex-col items-center justify-center px-12 py-6 text-center">
        <h3 className="mb-4 pt-4 font-semibold dark:text-gray-100">{title}</h3>
        <p className="whitespace-pre-wrap font-light dark:text-slate-200">
          {description}
        </p>
      </div>
    </article>
  )
}

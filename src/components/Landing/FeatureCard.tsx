import { ComponentProps } from 'react'

export const FeatureCard = (props: {
  title: string
  description: string
  Icon: (props: ComponentProps<'svg'>) => JSX.Element
}) => {
  const { title, description, Icon } = props

  return (
    <article className="relative rounded-lg bg-white py-6 text-center text-prog-gray-500 shadow-lg dark:bg-slate-600">
      <div className="absolute -top-6 left-1/2 inline-block -translate-x-1/2 rounded-md bg-prog-primary-500 p-4 shadow-lg">
        <Icon className="h-6 w-6 text-white" />
      </div>

      <div className="flex flex-col items-center justify-center px-12 py-6 text-center">
        <h3 className="mb-4 pt-4 font-semibold dark:text-white">{title}</h3>
        <p className="whitespace-pre-wrap font-light dark:text-slate-200">
          {description}
        </p>
      </div>
    </article>
  )
}

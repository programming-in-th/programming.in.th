import { ComponentProps, FC } from 'react'

export const FeatureCard: FC<{
  title: string
  description: string
  Icon: (props: ComponentProps<'svg'>) => JSX.Element
}> = props => {
  const { title, description, Icon } = props

  return (
    <article className="text-center py-6 relative shadow-lg bg-white text-prog-gray-500 rounded-lg">
      <div className="absolute bg-prog-primary-500 p-4 -top-6 left-1/2 -translate-x-1/2 shadow-lg rounded-md inline-block">
        <Icon className="w-6 h-6 text-white" />
      </div>

      <div className="flex text-center flex-col px-12 items-center justify-center py-6">
        <h3 className="mb-4 pt-4 font-semibold">{title}</h3>
        <p className="font-light">{description}</p>
      </div>
    </article>
  )
}

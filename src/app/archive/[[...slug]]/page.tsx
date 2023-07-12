import { notFound } from 'next/navigation'

import CategoryList from '@/components/Archive/CategoryList'
import getCategoryTree, { generatePath } from '@/utils/getCategoryTree'

export default async function Archive({
  params
}: {
  params: { slug: string[] }
}) {
  const category = await getCategoryTree(params.slug)
  if (!category) notFound()
  return (
    <div className="mx-auto p-5">
      {category.childCategories && (
        <CategoryList categories={category.childCategories} />
      )}
      {category.childTasks &&
        category.childTasks.map(task => <div key={task.id}>{task.title}</div>)}
    </div>
  )
}

export async function generateStaticParams() {
  return generatePath(await getCategoryTree()).map(path => ({
    slug: path
  }))
}

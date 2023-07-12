import { notFound } from 'next/navigation'

import Breadcrumb from '@/components/Archive/Breadcrumb'
import CategoryList from '@/components/Archive/CategoryList'
import TaskList from '@/components/Archive/TaskList'
import getCategoryTree, { generatePath } from '@/utils/getCategoryTree'

export default async function Archive({
  params
}: {
  params: { slug: string[] }
}) {
  const category = await getCategoryTree(params.slug)
  if (!category) notFound()
  return (
    <div>
      <Breadcrumb slug={params.slug} />
      <div className="relative mx-auto flex justify-center p-5">
        {category.childCategories && (
          <CategoryList categories={category.childCategories} />
        )}
        {category.childTasks && <TaskList tasks={category.childTasks} />}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return generatePath(await getCategoryTree()).map(path => ({
    slug: path
  }))
}

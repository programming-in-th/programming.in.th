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
      <Breadcrumb slug={params.slug} paths={await generatePaths(params.slug)} />
      <div className="relative mx-auto flex justify-center p-5">
        {category?.childCategories && (
          <CategoryList categories={category.childCategories} />
        )}
        {category?.childTasks && <TaskList tasks={category.childTasks} />}
      </div>
    </div>
  )
}

async function generatePaths(slug?: string[]) {
  if (!slug) return []
  const paths: string[][][] = []
  for (let i = 0; i < slug.length; ++i) {
    const category = await getCategoryTree(slug.slice(0, i))
    if (category?.childCategories) {
      paths.push(
        category.childCategories
          .filter(c => c.taskIds.length > 0)
          .map(c => c.path)
      )
    }
  }
  return paths
}

export async function generateStaticParams() {
  const paths = generatePath(await getCategoryTree()).map(path => ({
    slug: path
  }))
  return paths
}

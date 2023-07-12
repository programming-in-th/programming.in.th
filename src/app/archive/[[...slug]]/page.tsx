import CategoryList from '@/components/Archive/CategoryList'
import getCategoryTree from '@/utils/getCategoryTree'

export default async function Archive({
  params
}: {
  params: { slug: string[] }
}) {
  const category = await getCategoryTree(params.slug)
  return (
    <>
      {category.childCategories && (
        <CategoryList categories={category.childCategories} />
      )}
      {category.childTasks &&
        category.childTasks.map(task => <div key={task.id}>{task.title}</div>)}
    </>
  )
}

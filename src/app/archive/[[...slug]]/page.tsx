import Link from 'next/link'
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
    <div className="relative mx-auto max-w-7xl space-y-6 p-5">
      <div className="flex items-center gap-6">
        <Link
          href={`/archive/${
            params.slug ? params.slug.slice(0, -1).join('/') : ''
          }`}
        >
          <svg
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.14752 14.3642C6.78539 14.7263 6.19828 14.7263 5.83615 14.3642L2.12706 10.6551C1.76494 10.293 1.76494 9.70584 2.12706 9.34372L5.83615 5.63463C6.19828 5.27251 6.78539 5.27251 7.14751 5.63463C7.50964 5.99675 7.50964 6.58387 7.14751 6.94599L5.02138 9.07213L15.7646 9.07213C16.2767 9.07213 16.6918 9.48728 16.6918 9.9994C16.6918 10.5115 16.2767 10.9267 15.7646 10.9267L5.02138 10.9267L7.14752 13.0528C7.50964 13.4149 7.50964 14.002 7.14752 14.3642Z"
              fill="#64748B"
            />
          </svg>
        </Link>
        <div className="flex h-6 grow items-center gap-3 rounded-sm bg-gray-50 px-4 py-1">
          {params.slug?.map((path, index) => (
            <>
              <span className="text-gray-500" key={path}>
                {path}
              </span>
              {index !== params.slug.length - 1 && (
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 9L5 5L1 1" stroke="#64748B" />
                </svg>
              )}
            </>
          ))}
        </div>
      </div>
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

import Link from 'next/link'

import { ICategory } from '@/types/categories'

async function getSolved(category: ICategory) {
  return category.taskIds.length //TODO: implement and refactor into api route
}

async function CategoryCard({ category }: { category: ICategory }) {
  const solved = await getSolved(category)
  const total = category.taskIds.length
  return (
    <Link key={category.id} href={`/archive/${category.path.join('/')}`}>
      <div
        className="grid grid-cols-2 gap-6 rounded-lg p-5"
        style={{
          boxShadow:
            '0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)'
        }}
      >
        <div className="flex gap-3">
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-0.5 flex-none"
          >
            <path
              d="M2.57812 6C2.57812 4.89543 3.45635 4 4.5397 4H9.44365L11.4052 6H16.3092C17.3925 6 18.2707 6.89543 18.2707 8V14C18.2707 15.1046 17.3925 16 16.3092 16H4.5397C3.45635 16 2.57812 15.1046 2.57812 14V6Z"
              fill="#64748B"
            />
          </svg>
          <div>
            <h1 className="font-semibold text-gray-500">{category.title}</h1>
            <p className="mt-1 text-sm text-gray-400">
              {(solved / total) * 100}% solved
            </p>
          </div>
        </div>
        <div>
          <div className="mt-2 h-2 w-full rounded-lg bg-gray-100">
            <div
              className="h-2 rounded-lg bg-prog-primary-500"
              style={{ width: `${(solved / total) * 100}%` }}
            ></div>
          </div>
          <p className="mt-3 text-center text-xs text-gray-400">
            {solved}/{total}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default async function CategoryList({
  categories
}: {
  categories?: ICategory[]
}) {
  return (
    <div className="grid grid-cols-[minmax(0,20rem)] gap-3 sm:grid-cols-[repeat(2,minmax(0,20rem))] lg:grid-cols-[repeat(3,minmax(0,20rem))]">
      {categories?.map(
        category =>
          category.taskIds.length > 0 && (
            <CategoryCard key={category.id} category={category} />
          )
      )}
    </div>
  )
}

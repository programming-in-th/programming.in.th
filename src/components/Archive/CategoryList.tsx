import prisma from '@/lib/prisma'
import { ICategory } from '@/types/categories'

import CategoryCard from './CategoryCard'

export default async function CategoryList({
  categories
}: {
  categories?: ICategory[]
}) {
  const fullScores = (
    await prisma.task.findMany({
      where: { private: false },
      select: { fullScore: true, id: true }
    })
  ).reduce<Record<string, number>>(
    (acc, task) => ({ ...acc, [task.id]: task.fullScore }),
    {}
  )
  return (
    <div className="grid grid-cols-[minmax(0,30rem)] gap-3 sm:grid-cols-[repeat(2,minmax(0,20rem))] lg:grid-cols-[repeat(3,minmax(0,20rem))]">
      {categories?.map(
        category =>
          category.taskIds.length > 0 && (
            <CategoryCard
              key={category.id}
              category={category}
              fullScores={fullScores}
            />
          )
      )}
    </div>
  )
}

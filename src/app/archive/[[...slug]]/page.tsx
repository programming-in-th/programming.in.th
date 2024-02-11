import { Metadata } from 'next'

import { notFound } from 'next/navigation'

import { Prisma } from '@prisma/client'

import Breadcrumb from '@/components/Archive/Breadcrumb'
import CategoryList from '@/components/Archive/CategoryList'
import TaskList from '@/components/Archive/TaskList'
import prisma from '@/lib/prisma'
import { ISolved } from '@/types/tasks'
import { generatePath, getCategory } from '@/utils/getCategoryTree'

export const metadata: Metadata = {
  title: 'Archive - programming.in.th'
}

export default async function Archive({
  params
}: {
  params: { slug?: string[] }
}) {
  const category = await getCategory(params.slug || [])
  if (!category) notFound()
  return (
    <div>
      <Breadcrumb
        slug={params.slug ?? []}
        paths={await generatePaths(params.slug ?? [])}
        tasksPage={(category.childTasks?.length ?? 0) > 0}
      />
      <div className="relative mx-auto flex justify-center p-5">
        {category?.childCategories && (
          <CategoryList categories={category.childCategories} />
        )}
        {category?.childTasks && (
          <div className="max-w-7xl grow">
            <TaskList tasks={category.childTasks} solved={await getSolved()} />
          </div>
        )}
      </div>
    </div>
  )
}

async function getSolved() {
  const rawSolved = await prisma.$queryRaw(
    Prisma.sql`SELECT COUNT(DISTINCT submission.user_id), submission.task_id FROM submission INNER JOIN task ON submission.task_id = task.id WHERE submission.score = task.full_score GROUP BY submission.task_id`
  )

  return JSON.parse(
    JSON.stringify(rawSolved, (_, v) =>
      typeof v === 'bigint' ? `${v}n` : v
    ).replace(/"(-?\d+)n"/g, (_, a) => a)
  ) as ISolved[]
}

async function generatePaths(slug: string[]) {
  const paths: string[][][] = []
  for (let i = 0; i <= slug.length; ++i) {
    const category = await getCategory(slug.slice(0, i))
    if (category?.childCategories) {
      paths.push(
        category.childCategories
          .filter(c => c.taskIds.length > 0)
          .map(c => [c.id, c.title])
      )
    }
  }
  return paths
}

export async function generateStaticParams() {
  const paths = (await generatePath()).map(path => ({
    slug: path
  }))
  return paths
}

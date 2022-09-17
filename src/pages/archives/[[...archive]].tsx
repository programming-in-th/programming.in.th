import { GetStaticPaths, GetStaticProps } from 'next'

import { PageLayout } from '@/components/Layout'
import { ICategory } from '@/types/categories'
import getCategoryTree from '@/utils/getCategoryTree'

const Archives = ({ category }: { category: ICategory }) => {
  console.log(category)
  return (
    <PageLayout>
      <div className="flex w-auto justify-center">
        <div className="flex min-h-screen w-full max-w-7xl flex-col items-center">
          <div className="flex w-full flex-col items-center pt-6 pb-6">
            <p className="text-3xl font-medium text-gray-500 dark:text-gray-100">
              Tasks
            </p>
            <p className="text-md text-gray-500 dark:text-gray-300">
              browse over 700+ tasks
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default Archives

export const getStaticProps: GetStaticProps = async ctx => {
  const path = typeof ctx.params?.archive === 'object' ? ctx.params.archive : []
  console.log(path)
  return {
    props: { category: await getCategoryTree(path) } // top level category might be too large
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: string[][] = []
  const generatePaths = (category: ICategory) => {
    paths.push(category.path)
    for (const child of category.children)
      if ('children' in child) generatePaths(child)
    return paths
  }
  generatePaths(await getCategoryTree())
  return {
    paths: paths.map(path => ({ params: { archive: path } })),
    fallback: false
  }
}

import prisma from '@/lib/prisma'
import { ICategory } from '@/types/categories'
import { IGeneralTask } from '@/types/tasks'

let categoryTree: ICategory | null = null

export const generateCategoryTree = async () => {
  if (categoryTree) return categoryTree
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      parentCategoryId: true,
      childCategory: { select: { id: true }, orderBy: { name: 'asc' } },
      tasks: { where: { private: false }, include: { tags: true } }
    },
    orderBy: { name: 'asc' }
  })
  if (categories.length === 0) throw new Error('No categories found')
  const getTree = (node: (typeof categories)[number]): ICategory => {
    if (node.childCategory?.length) {
      const children = node.childCategory.map(child => {
        const childNode = categories.find(category => category.id === child.id)
        if (!childNode) throw new Error('Category not found')
        if (childNode.id === undefined) throw new Error('Category not found')
        return getTree(childNode)
      })
      return {
        id: node.id,
        path: node.id.split('/'),
        title: node.name,
        childCategories: children,
        taskIds: children.map(child => child.taskIds).flat()
      }
    }
    return {
      id: node.id,
      path: node.id.split('/'),
      title: node.name,
      childTasks: node.tasks.map<IGeneralTask>(task => ({
        id: task.id,
        title: task.title,
        tags: task.tags.map(tag => tag.name),
        solved: 0,
        score: 0,
        fullScore: task.fullScore,
        tried: false,
        bookmarked: false
      })),
      taskIds: node.tasks.map(item => item.id)
    }
  }

  return (categoryTree = getTree({
    id: '',
    name: '',
    childCategory: categories.filter(category => !category.parentCategoryId),
    parentCategoryId: '',
    tasks: []
  }))
}

export async function generatePath() {
  const categories = await generateCategoryTree()
  const paths: string[][] = []
  const genPaths = (cat?: ICategory) => {
    if (cat?.childCategories) {
      for (const c of cat.childCategories) {
        if (c.taskIds.length > 0) paths.push(c.path)
        genPaths(c)
      }
    }
  }
  genPaths(categories)
  return paths
}

export const getCategory = async (
  path: string[] = [],
  node?: ICategory,
  ohead = ''
): Promise<ICategory | undefined> => {
  if (node === undefined) node = await generateCategoryTree()

  if (path.length === 0) return node
  const [head, ...tail] = path
  const nextPath = ohead === '' ? head : ohead.concat('/').concat(head)
  const child = node.childCategories?.find(child => child.id === nextPath)
  if (child) return getCategory(tail, child, nextPath)
  return undefined
}

import prisma from '@/lib/prisma'
import { ICategory } from '@/types/categories'
import { IGeneralTask } from '@/types/tasks'

let categoryTree: ICategory | null = null

const generateCategoryTree = async () => {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      parentCategoryId: true,
      childCategory: { select: { id: true } },
      tasks: { where: { private: false }, include: { tags: true } }
    }
  })
  if (categories.length === 0) throw new Error('No categories found')
  const getTree = (
    node: (typeof categories)[number],
    path: string[]
  ): ICategory => {
    if (node.childCategory?.length) {
      const children = node.childCategory.map(child => {
        const childNode = categories.find(category => category.id === child.id)
        if (!childNode) throw new Error('Category not found')
        return getTree(childNode, [...path, childNode.name])
      })
      return {
        id: node.id,
        path,
        title: node.name,
        childCategories: children,
        taskIds: children.map(child => child.taskIds).flat()
      }
    }
    return {
      id: node.id,
      path,
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

  return getTree(
    {
      id: '',
      name: '',
      childCategory: categories.filter(category => !category.parentCategoryId),
      parentCategoryId: '',
      tasks: []
    },
    []
  )
}

export function generatePath(category?: ICategory) {
  const paths: string[][] = []
  const genPaths = (cat?: ICategory) => {
    if (cat?.childCategories) {
      for (const c of cat.childCategories) {
        if (c.taskIds.length > 0) paths.push(c.path)
        genPaths(c)
      }
    }
  }
  genPaths(category)
  return paths
}

const getCategoryTree = async (
  path: string[] = [],
  node?: ICategory
): Promise<ICategory | undefined> => {
  if (!categoryTree) {
    categoryTree = await generateCategoryTree()
  }

  if (!node) {
    node = categoryTree
  }

  if (path.length === 0) return node
  const [head, ...tail] = path
  const child = node.childCategories?.find(child => child.title === head)
  if (child) return getCategoryTree(tail, child)
  return undefined
}

export default getCategoryTree

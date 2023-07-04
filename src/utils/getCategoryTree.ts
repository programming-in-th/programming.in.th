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
      tasks: { where: { private: false } }
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
        path,
        title: node.name,
        children,
        taskIds: children.map(child => child.taskIds).flat()
      }
    }
    return {
      path,
      title: node.name,
      children: node.tasks.map<IGeneralTask>(item => {
        return {
          id: item.id,
          title: item.title,
          tags: [],
          solved: 0,
          score: 0,
          fullScore: item.fullScore,
          tried: false,
          bookmarked: false
        }
      }),
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

const isCategories = (
  node: ICategory[] | IGeneralTask[]
): node is ICategory[] => 'children' in node[0]

const getCategoryTree = async (
  path: string[] = [],
  node?: ICategory
): Promise<ICategory> => {
  if (!categoryTree) {
    categoryTree = await generateCategoryTree()
  }

  if (!node) {
    node = categoryTree
  }

  if (path.length === 0) return node
  const [head, ...tail] = path
  if (isCategories(node.children)) {
    const child = node.children.find(child => child.title === head)
    if (child) return getCategoryTree(tail, child)
  }

  throw new Error('Category not found')
}

export default getCategoryTree

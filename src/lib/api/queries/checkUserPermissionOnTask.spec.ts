import { beforeEach, describe, expect, it, vi } from 'vitest'

import checkUserPermissionOnTask from './checkUserPermissionOnTask'

const { prisma } = vi.hoisted(() => ({
  prisma: {
    task: { findUnique: vi.fn() },
    userOnAssessment: { findMany: vi.fn() }
  }
}))

vi.mock('@/lib/prisma', () => ({ default: prisma }))

describe('checkUserPermissionOnTask', () => {
  beforeEach(() => {
    prisma.task.findUnique
      .mockReset()
      .mockResolvedValue({ id: 't1', private: true })
    prisma.userOnAssessment.findMany.mockReset().mockResolvedValue([])
  })

  it('allows public tasks', async () => {
    prisma.task.findUnique.mockResolvedValue({ id: 't1', private: false })

    expect(await checkUserPermissionOnTask({ id: 'u1' }, 't1')).toBe(true)
  })

  it('reads private tasks only through an opened, non-archived assessment', async () => {
    prisma.userOnAssessment.findMany.mockResolvedValue([{}])

    expect(await checkUserPermissionOnTask({ id: 'u1' }, 't1')).toBe(true)

    const { where } = prisma.userOnAssessment.findMany.mock.calls[0][0]
    expect(where.userId).toBe('u1')
    expect(where.assessment.archived).toBe(false)
    expect(where.assessment.open.lte).toBeInstanceOf(Date)
    expect(where.assessment.tasks).toEqual({
      some: { taskId: { equals: 't1' } }
    })
  })

  it('denies private tasks without an enrollment', async () => {
    expect(await checkUserPermissionOnTask({ id: 'u1' }, 't1')).toBe(false)
    expect(await checkUserPermissionOnTask({}, 't1')).toBe(false)
  })
})

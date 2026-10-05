import { beforeEach, describe, expect, it, vi } from 'vitest'

import { checkUserPermissionOnAssessment } from './checkOwnerPermissionOnAssessment'

const { prisma } = vi.hoisted(() => ({
  prisma: {
    ownerOnAssessment: { findUnique: vi.fn() },
    userOnAssessment: { findUnique: vi.fn() }
  }
}))

vi.mock('@/lib/prisma', () => ({ default: prisma }))

describe('checkUserPermissionOnAssessment', () => {
  beforeEach(() => {
    prisma.ownerOnAssessment.findUnique.mockReset().mockResolvedValue(null)
    prisma.userOnAssessment.findUnique.mockReset().mockResolvedValue(null)
  })

  it('allows admins without querying', async () => {
    expect(await checkUserPermissionOnAssessment({ admin: true }, 'a1')).toBe(
      true
    )
    expect(prisma.userOnAssessment.findUnique).not.toHaveBeenCalled()
  })

  it('allows owners', async () => {
    prisma.ownerOnAssessment.findUnique.mockResolvedValue({ userId: 'u1' })

    expect(await checkUserPermissionOnAssessment({ id: 'u1' }, 'a1')).toBe(true)
  })

  it('allows enrolled users', async () => {
    prisma.userOnAssessment.findUnique.mockResolvedValue({ userId: 'u1' })

    expect(await checkUserPermissionOnAssessment({ id: 'u1' }, 'a1')).toBe(true)
    expect(prisma.userOnAssessment.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { userId_assessmentId: { userId: 'u1', assessmentId: 'a1' } }
      })
    )
  })

  it('denies everyone else', async () => {
    expect(await checkUserPermissionOnAssessment({ id: 'u1' }, 'a1')).toBe(
      false
    )
    expect(await checkUserPermissionOnAssessment({}, 'a1')).toBe(false)
  })
})

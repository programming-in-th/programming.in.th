// @vitest-environment node
import { NextRequest } from 'next/server'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { GET } from './route'

const { getServerUser, canViewAssessment, getScores } = vi.hoisted(() => ({
  getServerUser: vi.fn(),
  canViewAssessment: vi.fn(),
  getScores: vi.fn()
}))

vi.mock('@/lib/session', () => ({ getServerUser }))
vi.mock('@/lib/api/queries/checkOwnerPermissionOnAssessment', () => ({
  checkUserPermissionOnAssessment: canViewAssessment
}))
vi.mock('@/lib/server/assessment', () => ({
  getSubmissionsAndCalculateScore: getScores
}))

const get = (query: string) =>
  GET(new NextRequest(`http://localhost/api/submissions/assessment?${query}`))

describe('GET /api/submissions/assessment', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getServerUser.mockResolvedValue({ id: 'u1' })
    getScores.mockResolvedValue([])
  })

  it('rejects users outside the assessment', async () => {
    canViewAssessment.mockResolvedValue(false)

    expect((await get('assessmentId=a1')).status).toBe(403)
    expect(getScores).not.toHaveBeenCalled()
  })

  it('returns scores to members', async () => {
    canViewAssessment.mockResolvedValue(true)

    expect((await get('assessmentId=a1')).status).toBe(200)
    expect(getScores).toHaveBeenCalledWith('a1', 'u1')
  })

  it("still rejects other users' scores for non-admins", async () => {
    canViewAssessment.mockResolvedValue(true)

    expect((await get('assessmentId=a1&userId=u2')).status).toBe(403)
  })
})

// @vitest-environment node
import { NextRequest } from 'next/server'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { GET, POST } from './route'

const { prisma, getServerUser, getInfiniteSubmissions, perms } = vi.hoisted(
  () => ({
    prisma: {
      task: { findUnique: vi.fn() },
      userOnAssessment: { findUnique: vi.fn() },
      submission: { create: vi.fn() }
    },
    getServerUser: vi.fn(),
    getInfiniteSubmissions: vi.fn(),
    perms: {
      task: vi.fn(),
      ownerOnTask: vi.fn(),
      ownerOnAssessment: vi.fn()
    }
  })
)

vi.mock('@/lib/prisma', () => ({ default: prisma }))
vi.mock('@/lib/session', () => ({ getServerUser }))
vi.mock('@/lib/api/queries/getInfiniteSubmissions', () => ({
  getInfiniteSubmissions
}))
vi.mock('@/lib/api/queries/checkUserPermissionOnTask', () => ({
  default: perms.task
}))
vi.mock('@/lib/api/queries/checkOwnerPermissionOnAssessment', () => ({
  default: perms.ownerOnAssessment,
  checkOwnerPermissionOnTask: perms.ownerOnTask
}))

const get = (query: string) =>
  GET(new NextRequest(`http://localhost/api/submissions?${query}`))

const whereArg = () => getInfiniteSubmissions.mock.lastCall?.[4]

beforeEach(() => {
  vi.clearAllMocks()
  getInfiniteSubmissions.mockResolvedValue({ data: [], nextCursor: null })
  perms.task.mockResolvedValue(true)
  perms.ownerOnTask.mockResolvedValue(false)
})

describe('GET /api/submissions', () => {
  it('hides private tasks and assessment submissions from the global list', async () => {
    getServerUser.mockResolvedValue(undefined)
    await get('')

    expect(whereArg()).toEqual({ private: false, task: { private: false } })
  })

  it('keeps own submissions on private tasks in the own list', async () => {
    getServerUser.mockResolvedValue({ id: 'u1' })
    await get('filter=own')

    expect(whereArg()).toEqual({ private: false })
  })

  it('does not filter the global list for admins', async () => {
    getServerUser.mockResolvedValue({ id: 'admin', admin: true })
    await get('')

    expect(whereArg()).toEqual({})
  })

  it('hides assessment submissions on a public task from others', async () => {
    prisma.task.findUnique.mockResolvedValue({ id: 't1', private: false })
    getServerUser.mockResolvedValue(undefined)
    await get('filter=task&taskId=t1')

    expect(whereArg()).toEqual({ private: false })

    getServerUser.mockResolvedValue({ id: 'u1' })
    await get('filter=task&taskId=t1&filter=own')

    expect(whereArg()).toBeUndefined()
  })

  it('limits non-owners to their own submissions on a private task', async () => {
    prisma.task.findUnique.mockResolvedValue({ id: 't1', private: true })
    getServerUser.mockResolvedValue({ id: 'u1' })
    await get('filter=task&taskId=t1')

    expect(whereArg()).toEqual({ userId: 'u1' })

    perms.ownerOnTask.mockResolvedValue(true)
    await get('filter=task&taskId=t1')

    expect(whereArg()).toBeUndefined()
  })
})

describe('POST /api/submissions', () => {
  const post = (body: object) =>
    POST(
      new NextRequest('http://localhost/api/submissions', {
        method: 'POST',
        body: JSON.stringify({
          taskId: 't1',
          language: 'cpp',
          code: ['int main(){}'],
          ...body
        })
      })
    )

  beforeEach(() => {
    getServerUser.mockResolvedValue({ id: 'u1', username: 'u1' })
    prisma.submission.create.mockResolvedValue({ id: 1, private: false })
  })

  it('accepts submissions outside assessments', async () => {
    expect((await post({})).status).toBe(200)
    expect(prisma.userOnAssessment.findUnique).not.toHaveBeenCalled()
  })

  it('requires an open assessment the user is enrolled in that has the task', async () => {
    prisma.userOnAssessment.findUnique.mockResolvedValue(null)

    expect((await post({ assessmentId: 'a1' })).status).toBe(403)
    expect(prisma.submission.create).not.toHaveBeenCalled()

    const { where } = prisma.userOnAssessment.findUnique.mock.calls[0][0]
    expect(where.userId_assessmentId).toEqual({
      userId: 'u1',
      assessmentId: 'a1'
    })
    expect(where.assessment).toMatchObject({
      archived: false,
      open: { lte: expect.any(Date) },
      close: { gte: expect.any(Date) },
      tasks: { some: { taskId: 't1' } }
    })

    prisma.userOnAssessment.findUnique.mockResolvedValue({ userId: 'u1' })
    expect((await post({ assessmentId: 'a1' })).status).toBe(200)
  })
})

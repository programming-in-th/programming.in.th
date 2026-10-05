// @vitest-environment node
import { NextRequest } from 'next/server'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { PUT } from './[id]/route'
import { POST } from './route'

const { prisma, getServerUser, ownerPermission } = vi.hoisted(() => ({
  prisma: {
    assessment: { create: vi.fn(), findUnique: vi.fn(), update: vi.fn() },
    task: { count: vi.fn() },
    taskOnAssessment: { deleteMany: vi.fn() },
    userOnAssessment: { deleteMany: vi.fn() },
    ownerOnAssessment: { deleteMany: vi.fn() },
    $transaction: vi.fn()
  },
  getServerUser: vi.fn(),
  ownerPermission: vi.fn()
}))

vi.mock('@/lib/prisma', () => ({ default: prisma }))
vi.mock('@/lib/session', () => ({ getServerUser }))
vi.mock('@/lib/api/queries/checkOwnerPermissionOnAssessment', () => ({
  default: ownerPermission
}))

const body = {
  id: 'camp-2026',
  name: 'Camp',
  archived: false,
  open: '2026-01-01T00:00:00.000Z',
  close: '2026-01-02T00:00:00.000Z'
}

const request = (method: string, payload: object) =>
  new NextRequest('http://localhost/api/assessments', {
    method,
    body: JSON.stringify(payload)
  })

beforeEach(() => {
  vi.clearAllMocks()
})

describe('POST /api/assessments', () => {
  it('rejects non-admins', async () => {
    getServerUser.mockResolvedValue({ id: 'u1' })

    expect((await POST(request('POST', body))).status).toBe(403)
    expect(prisma.assessment.create).not.toHaveBeenCalled()
  })

  it.each(['../tasks/0000', 'a/b', '%2e%2e', 'with space'])(
    'rejects id %s',
    async id => {
      getServerUser.mockResolvedValue({ id: 'admin', admin: true })

      expect((await POST(request('POST', { ...body, id }))).status).toBe(400)
    }
  )

  it('creates for admins', async () => {
    getServerUser.mockResolvedValue({ id: 'admin', admin: true })
    prisma.assessment.create.mockResolvedValue({ id: body.id })

    expect((await POST(request('POST', body))).status).toBe(200)
  })
})

describe('PUT /api/assessments/[id]', () => {
  beforeEach(() => {
    getServerUser.mockResolvedValue({ id: 'owner' })
    ownerPermission.mockResolvedValue(true)
    prisma.assessment.findUnique.mockResolvedValue({
      tasks: [{ taskId: 'kept' }],
      users: [],
      owners: [{ userId: 'owner' }]
    })
    prisma.$transaction.mockResolvedValue([0, 0, 0, { id: body.id }])
  })

  const put = (tasks: string[]) =>
    PUT(request('PUT', { ...body, tasks, owners: ['owner'] }))

  it('lets owners add public tasks and private tasks from their assessments', async () => {
    prisma.task.count.mockResolvedValue(2)

    expect((await put(['kept', 'public', 'mine', 'mine']))?.status).toBe(200)

    const { where } = prisma.task.count.mock.calls[0][0]
    expect(where.id).toEqual({ in: ['public', 'mine', 'mine'] })
    expect(where.OR).toEqual([
      { private: false },
      {
        taskOnAssessment: {
          some: { assessment: { owners: { some: { userId: 'owner' } } } }
        }
      }
    ])
  })

  it('rejects owners adding any other task', async () => {
    prisma.task.count.mockResolvedValue(1)

    expect((await put(['public', 'foreign']))?.status).toBe(403)
    expect(prisma.$transaction).not.toHaveBeenCalled()
  })

  it('does not restrict admins or unchanged tasks', async () => {
    expect((await put(['kept']))?.status).toBe(200)

    getServerUser.mockResolvedValue({ id: 'admin', admin: true })
    expect((await put(['foreign']))?.status).toBe(200)

    expect(prisma.task.count).not.toHaveBeenCalled()
  })
})

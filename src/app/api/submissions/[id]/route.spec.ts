// @vitest-environment node
import { NextRequest } from 'next/server'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { compressCode } from '@/lib/codeTransformer'

import { GET as GET_REALTIME } from './realtime/route'
import { GET } from './route'

const { prisma, getServerUser, canView } = vi.hoisted(() => ({
  prisma: { submission: { findUnique: vi.fn() } },
  getServerUser: vi.fn(),
  canView: vi.fn()
}))

vi.mock('@/lib/prisma', () => ({ default: prisma }))
vi.mock('@/lib/session', () => ({ getServerUser }))
vi.mock('@/lib/api/queries/checkUserPermissionOnSubmission', () => ({
  default: canView
}))

const req = new NextRequest('http://localhost/api/submissions/1')
const ctx = { params: Promise.resolve({ id: '1' }) }

async function submission(taskPrivate: boolean, submissionPrivate: boolean) {
  return {
    id: 1,
    status: 'Completed',
    score: 100,
    groups: [],
    userId: 'author',
    user: { id: 'author', username: 'author', name: 'Author' },
    task: { id: 't1', private: taskPrivate },
    code: await compressCode(JSON.stringify(['int main(){}'])),
    assessmentId: submissionPrivate ? 'a1' : null,
    private: submissionPrivate
  }
}

describe.each([
  ['GET /api/submissions/[id]', GET],
  ['GET /api/submissions/[id]/realtime', GET_REALTIME]
])('%s', (_, handler) => {
  beforeEach(() => {
    getServerUser.mockReset()
    canView.mockReset()
  })

  it('serves public submissions on public tasks without a session', async () => {
    prisma.submission.findUnique.mockResolvedValue(
      await submission(false, false)
    )

    const res = await handler(req, ctx as never)

    expect(res.status).toBe(200)
    expect(getServerUser).not.toHaveBeenCalled()
  })

  it.each([
    ['assessment submission on a public task', false, true],
    ['submission on a private task', true, false]
  ])('guards a %s', async (_, taskPrivate, submissionPrivate) => {
    prisma.submission.findUnique.mockResolvedValue(
      await submission(taskPrivate, submissionPrivate)
    )

    getServerUser.mockResolvedValue(undefined)
    expect((await handler(req, ctx as never)).status).toBe(401)

    getServerUser.mockResolvedValue({ id: 'other' })
    canView.mockResolvedValue(false)
    expect((await handler(req, ctx as never)).status).toBe(403)

    canView.mockResolvedValue(true)
    const res = await handler(req, ctx as never)
    expect(res.status).toBe(200)
    expect(await res.json()).not.toHaveProperty('private')
    expect(canView).toHaveBeenLastCalledWith(
      { id: 'other' },
      {
        userId: 'author',
        taskId: 't1',
        assessmentId: submissionPrivate ? 'a1' : null
      }
    )
  })
})

describe('GET /api/submissions/[id]/realtime payload', () => {
  it('returns only the judging status fields', async () => {
    prisma.submission.findUnique.mockResolvedValue(
      await submission(false, false)
    )

    const res = await GET_REALTIME(req, ctx as never)

    expect(await res.json()).toEqual({
      id: 1,
      status: 'Completed',
      score: 100,
      groups: []
    })
  })
})

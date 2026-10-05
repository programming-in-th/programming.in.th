import { beforeEach, describe, expect, it, vi } from 'vitest'

import checkUserPermissionOnSubmission from './checkUserPermissionOnSubmission'

const { taskPermission, ownerPermission } = vi.hoisted(() => ({
  taskPermission: vi.fn(),
  ownerPermission: vi.fn()
}))

vi.mock('./checkUserPermissionOnTask', () => ({ default: taskPermission }))
vi.mock('./checkOwnerPermissionOnAssessment', () => ({
  default: ownerPermission
}))

const submission = { userId: 'author', taskId: 't1', assessmentId: 'a1' }

describe('checkUserPermissionOnSubmission', () => {
  beforeEach(() => {
    taskPermission.mockReset().mockResolvedValue(true)
    ownerPermission.mockReset().mockResolvedValue(false)
  })

  it('allows admins', async () => {
    expect(
      await checkUserPermissionOnSubmission({ admin: true }, submission)
    ).toBe(true)
  })

  it('allows the submitter while they can read the task', async () => {
    expect(
      await checkUserPermissionOnSubmission({ id: 'author' }, submission)
    ).toBe(true)

    taskPermission.mockResolvedValue(false)
    expect(
      await checkUserPermissionOnSubmission({ id: 'author' }, submission)
    ).toBe(false)
  })

  it('allows owners of the submission assessment', async () => {
    ownerPermission.mockResolvedValue(true)

    expect(
      await checkUserPermissionOnSubmission({ id: 'owner' }, submission)
    ).toBe(true)
    expect(ownerPermission).toHaveBeenCalledWith({ id: 'owner' }, 'a1')
  })

  it('denies other users', async () => {
    expect(
      await checkUserPermissionOnSubmission({ id: 'other' }, submission)
    ).toBe(false)
  })

  it('denies a user without id even when the submitter is unknown', async () => {
    expect(
      await checkUserPermissionOnSubmission(
        {},
        { ...submission, userId: undefined }
      )
    ).toBe(false)
  })
})

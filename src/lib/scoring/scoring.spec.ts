import { describe, it, expect } from 'vitest'

import { SubmissionModel } from '@/prisma/models'

import { not_ttamx } from './__mocks__/ttamx'
import { bestSubmission, sumSubtask } from './scoring'

describe('Scoring', () => {
  it('Best Submission', () => {
    expect(bestSubmission([])).toBe(0)
    expect(bestSubmission(not_ttamx as unknown as SubmissionModel[])).toBe(40)
  })

  it('Sum Subtask', () => {
    expect(sumSubtask([])).toBe(0)
    expect(sumSubtask(not_ttamx as unknown as SubmissionModel[])).toBe(65)
  })
})

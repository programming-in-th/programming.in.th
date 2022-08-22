import { z } from 'zod'

import { dateParser } from './helper'

export const IndividualAssessmentSchema = z.object({
  id: z.string()
})

export type IndividualAssessmentSchema = z.infer<
  typeof IndividualAssessmentSchema
>

export const CreateAssessmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  private: z.boolean(),
  description: z.string().optional(),
  instruction: z.string().optional(),
  tasks: z.string().array().optional(),
  users: z.string().array().optional(),
  owners: z.string().array().optional(),
  open: dateParser,
  close: dateParser
})

export type CreateAssessmentSchema = z.infer<typeof CreateAssessmentSchema>

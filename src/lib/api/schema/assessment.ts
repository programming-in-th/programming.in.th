import { z } from 'zod'

import { dateParser } from './helper'

export const markdownTypeValues = ['RAW', 'RENDERED'] as const
const MarkdownTypeEnum = z.enum(markdownTypeValues)

export const IndividualAssessmentSchema = z.object({
  id: z.string(),
  mdType: MarkdownTypeEnum.optional()
})

export type IndividualAssessmentSchema = z.infer<
  typeof IndividualAssessmentSchema
>

export const CreateAssessmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  archived: z.boolean(),
  description: z.string().optional(),
  instruction: z.string().optional(),
  tasks: z.string().array().optional(),
  users: z.string().array().optional(),
  owners: z.string().array().optional(),
  open: dateParser,
  close: dateParser
})

export type CreateAssessmentSchema = z.infer<typeof CreateAssessmentSchema>

// The id is used as a URL path segment; only enforced on create so existing
// assessments stay editable.
export const NewAssessmentSchema = CreateAssessmentSchema.extend({
  id: z.string().regex(/^[\w-]+$/)
})

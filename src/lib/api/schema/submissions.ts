import { z } from 'zod'

import { stringToNumber } from './helper'

export const SubmissionFilterEnum = z.enum(['own', 'task'])

export const SubmissionSchema = z
  .object({
    taskId: z.string(),
    cursor: stringToNumber,
    limit: stringToNumber,
    filter: z.union([SubmissionFilterEnum, z.array(SubmissionFilterEnum)])
  })
  .partial()

export type SubmissionSchema = z.infer<typeof SubmissionSchema>

export const AssessmentSubmissionSchema = SubmissionSchema.extend({
  id: z.string()
}).partial()

export type AssessmentSubmissionSchema = z.infer<
  typeof AssessmentSubmissionSchema
>

export const SubmitSchema = z.object({
  taskId: z.string(),
  language: z.string(),
  code: z.string().array()
})

export type SubmitSchema = z.infer<typeof SubmitSchema>

export const IndividualSubmissionSchema = z.object({
  id: stringToNumber
})

export type IndividualSubmissionSchema = z.infer<
  typeof IndividualSubmissionSchema
>

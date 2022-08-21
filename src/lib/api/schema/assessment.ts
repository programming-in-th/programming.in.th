import { z } from 'zod'

export const IndividualAssessmentSchema = z.object({
  id: z.string()
})

export type IndividualAssessmentSchema = z.infer<
  typeof IndividualAssessmentSchema
>

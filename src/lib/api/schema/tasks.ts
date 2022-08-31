import { z } from 'zod'

const TaskTypeEnum = z.enum(['NORMAL', 'COMMUNICATION', 'OUTPUT_ONLY'])
const StatementTypeEnum = z.enum(['PDF', 'MARKDOWN'])

export const TaskSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  fullScore: z.number(),
  path: z.string(),
  private: z.boolean(),
  type: TaskTypeEnum,
  statement: StatementTypeEnum
})

export type TaskSchema = z.infer<typeof TaskSchema>

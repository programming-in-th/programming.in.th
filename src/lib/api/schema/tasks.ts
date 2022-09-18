import { z } from 'zod'

const TaskTypeEnum = z.enum(['NORMAL', 'COMMUNICATION', 'OUTPUT_ONLY'])
const StatementTypeEnum = z.enum(['PDF', 'MARKDOWN'])

export const IndividualTaskSchema = z.object({ id: z.string().min(1) })

export type IndividualTaskSchema = z.infer<typeof IndividualTaskSchema>

export const TaskSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  fullScore: z.number(),
  categoryId: z.string(),
  private: z.boolean(),
  tags: z.array(z.string()),
  type: TaskTypeEnum,
  statement: StatementTypeEnum
})

export type TaskSchema = z.infer<typeof TaskSchema>

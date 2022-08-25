import { z } from 'zod'

const TaskTypeEnum = z.enum(['normal', 'outputonly', 'communication'])

export const TaskSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  fullScore: z.number(),
  memoryLimit: z.number(),
  timeLimit: z.number(),
  path: z.string(),
  private: z.boolean(),
  type: TaskTypeEnum
})

export type TaskSchema = z.infer<typeof TaskSchema>

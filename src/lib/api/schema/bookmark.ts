import { z } from 'zod'

export const BookmarkCDSchema = z.object({
  taskId: z.string()
})

export type BookmarkCDSchema = z.infer<typeof BookmarkCDSchema>

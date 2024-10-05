import { z } from 'zod'

export const updateTaskStatusSchema = z.object({
  status: z.enum(['PENDING', 'COMPLETED']),
})

export type UpdateTaskStatusDTO = z.infer<typeof updateTaskStatusSchema>

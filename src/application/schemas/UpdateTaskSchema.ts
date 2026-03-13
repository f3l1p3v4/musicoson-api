import { z } from 'zod'

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  observation: z.string().optional(),
  delivery_date: z
    .string()
    .optional()
    .refine((value) => {
      if (value === undefined) return true
      const date = new Date(value)
      return !isNaN(date.getTime())
    }, 'Invalid date format')
    .transform((value) => (value ? new Date(value) : undefined)),
  status: z.enum(['PENDING', 'COMPLETED']).optional(),
  category: z.enum(['MSA', 'METODO', 'HINOS']).optional(),
  studentId: z.string().uuid().optional().nullable(),
  group: z.enum(['GROUP_01', 'GROUP_02', 'GROUP_03', 'GROUP_04']).optional().nullable(),
})

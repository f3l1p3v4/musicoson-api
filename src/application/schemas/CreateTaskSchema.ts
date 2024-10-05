import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  observation: z.string().optional(),
  delivery_date: z
    .string()
    .optional()
    .refine((value) => {
      if (value === undefined) return true // Permite que `undefined` passe pela validação
      const date = new Date(value)
      return !isNaN(date.getTime()) // Verifica se a string pode ser convertida em uma data válida
    }, 'Invalid date format')
    .transform((value) => (value ? new Date(value) : undefined)), // Transforma para Date apenas se `value` não for `undefined`
  status: z.enum(['PENDING', 'COMPLETED']).optional(),
  category: z.enum(['MSA', 'METODO', 'HINOS']),
  studentId: z.string().uuid().optional(),
  group: z.enum(['GROUP_01', 'GROUP_02', 'GROUP_03', 'GROUP_04']).optional(),
})

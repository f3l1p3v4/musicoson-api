import { z } from 'zod'

export const UserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10,15}$/, 'Invalid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z
    .enum(['INSTRUCTOR', 'STUDENT'])
    .refine((val) => ['INSTRUCTOR', 'STUDENT'].includes(val), {
      message: 'Invalid role',
    }),
  instrument: z.string().optional(),
  group: z.enum(['GROUP_01', 'GROUP_02', 'GROUP_03', 'GROUP_04']).optional(),
  practical_level: z.enum(['C_JOVEM', 'C_OFICIAL', 'OFICIALIZACAO']).optional(),
})

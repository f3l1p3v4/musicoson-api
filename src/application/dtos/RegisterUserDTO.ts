import { UserRole, Group, PracticalLevel } from '@prisma/client'

export interface RegisterUserDTO {
  name: string
  email: string
  phone: string
  password: string
  role: UserRole
  instrument?: string | null
  group?: Group | null
  practical_level?: PracticalLevel | null
}

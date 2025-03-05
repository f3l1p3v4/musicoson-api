import { Group } from '@prisma/client'

export interface UpdateClassPlanDTO {
  group?: Group
  date?: Date
  subject?: string
  page?: string
  exercise?: string
}

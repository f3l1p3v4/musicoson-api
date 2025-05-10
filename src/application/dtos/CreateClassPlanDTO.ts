import { Group } from '@prisma/client'

export interface CreateClassPlanDTO {
  group: Group
  date: Date
  subject: string
  page: string
  exercise: string
  instructor_id?: string
}

import { Group } from '@prisma/client'

export interface ClassPlan {
  id: string
  group: Group
  date: Date
  subject: string
  page: string
  exercise: string
  createdAt: Date
  updatedAt: Date
}

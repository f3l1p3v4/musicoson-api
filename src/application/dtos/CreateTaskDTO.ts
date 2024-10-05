import { TaskCategory, TaskStatus, Group } from '@prisma/client'

export interface CreateTaskDTO {
  title: string
  description: string
  observation?: string
  delivery_date?: Date
  status?: TaskStatus
  category: TaskCategory
  studentId?: string
  group?: Group
}

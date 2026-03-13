import { TaskCategory, TaskStatus, Group } from '@prisma/client'

export interface UpdateTaskDTO {
  title?: string
  description?: string
  observation?: string
  delivery_date?: Date
  status?: TaskStatus
  category?: TaskCategory
  studentId?: string | null
  group?: Group | null
}

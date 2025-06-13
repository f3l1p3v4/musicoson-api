import { Task } from '@prisma/client'
import { CreateTaskDTO } from '../../application/dtos/CreateTaskDTO'

export interface ITaskRepository {
  create(data: CreateTaskDTO, instructorId: string): Promise<Task>
  updateStatus(id: string, status: 'PENDING' | 'COMPLETED'): Promise<Task>
  list(): Promise<Task[]>
  listByInstructor(instructorId: string): Promise<Task[]>
  listByStudent(studentId: string, group: string | null): Promise<Task[]>
  delete(id: string): Promise<void>
}

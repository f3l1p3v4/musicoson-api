import { Task } from '@prisma/client'
import { CreateTaskDTO } from '../../application/dtos/CreateTaskDTO'
import { UpdateTaskDTO } from '../../application/dtos/UpdateTaskDTO'

export interface ITaskRepository {
  findById(id: string): Promise<Task | null>
  create(data: CreateTaskDTO, instructorId: string): Promise<Task>
  update(id: string, data: UpdateTaskDTO): Promise<Task>
  updateStatus(id: string, status: 'PENDING' | 'COMPLETED'): Promise<Task>
  list(): Promise<Task[]>
  listByInstructor(instructorId: string): Promise<Task[]>
  listByStudent(studentId: string, group: string | null): Promise<Task[]>
  delete(id: string): Promise<void>
}

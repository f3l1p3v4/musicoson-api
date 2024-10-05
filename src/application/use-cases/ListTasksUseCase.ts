import { ITaskRepository } from '@/application/interfaces/ITaskRepository'
import { Task } from '@prisma/client'

interface ListTasksParams {
  studentId?: string
  group?: string | null
  instructorId?: string
}

export class ListTasksUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private taskRepository: ITaskRepository) {}

  async execute(params: ListTasksParams): Promise<Task[]> {
    const { studentId, group, instructorId } = params

    if (instructorId) {
      return this.taskRepository.listByInstructor(instructorId)
    }

    if (studentId) {
      return this.taskRepository.listByStudent(studentId, group || null)
    }

    return this.taskRepository.list()
  }
}

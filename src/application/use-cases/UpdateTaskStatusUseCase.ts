import { ITaskRepository } from '../../application/interfaces/ITaskRepository'
// import { UpdateTaskStatusDTO } from '../../application/dtos/UpdateTaskStatusDTO'
import { Task } from '@prisma/client'

export class UpdateTaskStatusUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private taskRepository: ITaskRepository) {}

  async execute(
    taskId: string,
    data: { status: 'PENDING' | 'COMPLETED' },
  ): Promise<Task> {
    const { status } = data
    return this.taskRepository.updateStatus(taskId, status)
  }
}

import { Task } from '@prisma/client'
import { ITaskRepository } from '../interfaces/ITaskRepository'
import { UpdateTaskDTO } from '../dtos/UpdateTaskDTO'
import { NotFoundError } from '../../infra/errors/NotFoundError'

export class UpdateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string, data: UpdateTaskDTO): Promise<Task> {
    const task = await this.taskRepository.findById(id)

    if (!task) {
      throw new NotFoundError('Task not found')
    }

    return this.taskRepository.update(id, data)
  }
}

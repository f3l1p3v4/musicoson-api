import { TaskRepository } from '@/infra/repositories/TaskRepository'
import { NotFoundError } from '@/infra/errors/NotFoundError'

export class DeleteTaskUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string): Promise<void> {
    const task = await this.taskRepository.findById(id)

    if (!task) {
      throw new NotFoundError('Task not found')
    }

    await this.taskRepository.delete(id)
  }
}

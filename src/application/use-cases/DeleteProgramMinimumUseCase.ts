import { IProgramMinimumRepository } from '@/application/interfaces/IProgramMinimumRepository'

export class DeleteProgramMinimumUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private programMinimumRepository: IProgramMinimumRepository) {}

  async execute(id: string): Promise<void> {
    await this.programMinimumRepository.delete(id)
  }
}

import { IProgramMinimumRepository } from '@/application/interfaces/IProgramMinimumRepository'
import { ProgramMinimum } from '@prisma/client'

export class ListProgramMinimumsUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private programMinimumRepository: IProgramMinimumRepository) {}

  async execute(): Promise<ProgramMinimum[]> {
    const programMinimums = await this.programMinimumRepository.findAll()
    return programMinimums
  }
}

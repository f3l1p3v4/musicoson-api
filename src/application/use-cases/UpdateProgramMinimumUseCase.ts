import { IProgramMinimumRepository } from '@/application/interfaces/IProgramMinimumRepository'
import { ProgramMinimum } from '@prisma/client'
import { CreateProgramMinimumDTO } from '@/application/dtos/CreateProgramMinimumDTO'

export class UpdateProgramMinimumUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private programMinimumRepository: IProgramMinimumRepository) {}

  async execute(
    id: string,
    data: CreateProgramMinimumDTO,
  ): Promise<ProgramMinimum> {
    const updatedProgramMinimum = await this.programMinimumRepository.update(
      id,
      data,
    )
    return updatedProgramMinimum
  }
}

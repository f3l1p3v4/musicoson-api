import { IProgramMinimumRepository } from '@/application/interfaces/IProgramMinimumRepository'
import { ProgramMinimum } from '@prisma/client'
import { CreateProgramMinimumDTO } from '@/application/dtos/CreateProgramMinimumDTO'

export class CreateProgramMinimumUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private programMinimumRepository: IProgramMinimumRepository) {}

  async execute(
    instructorId: string,
    data: CreateProgramMinimumDTO,
  ): Promise<ProgramMinimum> {
    const programMinimum = await this.programMinimumRepository.create(
      data,
      instructorId,
    )
    return programMinimum
  }
}

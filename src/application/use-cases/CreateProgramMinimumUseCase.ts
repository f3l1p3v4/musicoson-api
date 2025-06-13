import { IProgramMinimumRepository } from '../../application/interfaces/IProgramMinimumRepository'
import { ProgramMinimum } from '@prisma/client'
import { CreateProgramMinimumDTO } from '../../application/dtos/CreateProgramMinimumDTO'

export class CreateProgramMinimumUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private programMinimumRepository: IProgramMinimumRepository) {}

  async execute(
    instructorId: string,
    data: CreateProgramMinimumDTO,
  ): Promise<ProgramMinimum> {
    if (!data.instrument) {
      throw new Error('Instrument is required')
    }

    if (!data.meetings && !data.cults && !data.officialization) {
      throw new Error(
        'At least one of meetings, cults or officialization must be provided',
      )
    }

    const programMinimum = await this.programMinimumRepository.create(
      data,
      instructorId,
    )
    return programMinimum
  }
}

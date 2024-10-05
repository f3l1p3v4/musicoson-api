import { ProgramMinimum } from '@prisma/client'
import { CreateProgramMinimumDTO } from '@/application/dtos/CreateProgramMinimumDTO'

export interface IProgramMinimumRepository {
  create(
    data: CreateProgramMinimumDTO,
    instructorId: string,
  ): Promise<ProgramMinimum>
  findAll(): Promise<ProgramMinimum[]>
  update(
    id: string,
    data: Partial<CreateProgramMinimumDTO>,
  ): Promise<ProgramMinimum>
  delete(id: string): Promise<void>
  findById(id: string): Promise<ProgramMinimum | null>
}

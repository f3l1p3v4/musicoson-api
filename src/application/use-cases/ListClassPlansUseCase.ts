import { Group } from '@prisma/client' // Importação correta
import { IClassPlanRepository } from '../interfaces/IClassPlanRepository'
import { ClassPlan } from './domain/entities/ClassPlan' // Use a interface correta

export class ListClassPlansUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private classPlanRepository: IClassPlanRepository) {}

  async execute(filters?: {
    group?: Group
    date?: Date
  }): Promise<ClassPlan[]> {
    return this.classPlanRepository.findAll(filters)
  }
}

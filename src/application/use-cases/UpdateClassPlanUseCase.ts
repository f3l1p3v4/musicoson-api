import { IClassPlanRepository } from '../../application/interfaces/IClassPlanRepository'
import { ClassPlan } from '../../domain/entities/ClassPlan'
import { UpdateClassPlanDTO } from '../../application/dtos/UpdateClassPlanDTO'

export class UpdateClassPlanUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private classPlanRepository: IClassPlanRepository) {}

  async execute(
    id: string,
    data: UpdateClassPlanDTO,
  ): Promise<ClassPlan | null> {
    return this.classPlanRepository.update(id, data)
  }
}

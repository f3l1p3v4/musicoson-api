import { IClassPlanRepository } from '@/application/interfaces/IClassPlanRepository'
import { ClassPlan } from '@/domain/entities/ClassPlan'
import { CreateClassPlanDTO } from '@/application/dtos/CreateClassPlanDTO'

export class CreateClassPlanUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private classPlanRepository: IClassPlanRepository) {}

  async execute(data: CreateClassPlanDTO): Promise<ClassPlan> {
    const formattedDate = new Date(data.date)

    if (isNaN(formattedDate.getTime())) {
      throw new Error('Data inválida fornecida.')
    }

    console.log('Instructor ID:', data.instructor_id)

    return this.classPlanRepository.create({
      ...data,
      date: formattedDate, // 🔥 Garante que a data está no formato correto
    })
  }
}

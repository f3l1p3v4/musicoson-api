import { Request, Response } from 'express'
import { CreateClassPlanUseCase } from '../../../application/use-cases/CreateClassPlanUseCase'
import { ListClassPlansUseCase } from '../../../application/use-cases/ListClassPlansUseCase'
import { UpdateClassPlanUseCase } from '../../../application/use-cases/UpdateClassPlanUseCase'
import { CreateClassPlanDTO } from '../../../application/dtos/CreateClassPlanDTO'
import { UpdateClassPlanDTO } from '../../../application/dtos/UpdateClassPlanDTO'
import { Group } from '@prisma/client'

export class ClassPlanController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private createClassPlanUseCase: CreateClassPlanUseCase,
    private listClassPlansUseCase: ListClassPlansUseCase,
    private updateClassPlanUseCase: UpdateClassPlanUseCase,
  ) {}

  async create(req: Request, res: Response) {
    const data: CreateClassPlanDTO = req.body
    const instructorId = req.userId // 👈 Pegando o ID do instrutor autenticado

    if (!instructorId) {
      return res.status(403).json({ error: 'Acesso não autorizado' })
    }

    const classPlan = await this.createClassPlanUseCase.execute({
      ...data,
      instructor_id: instructorId, // 👈 Garantindo que o instructor_id seja passado
    })

    return res.status(201).json(classPlan)
  }

  async list(req: Request, res: Response) {
    const { group, date } = req.query
    const filters = {
      group: group as Group,
      date: date ? new Date(date as string) : undefined,
    }

    const classPlans = await this.listClassPlansUseCase.execute(filters)
    return res.json(classPlans)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const data: UpdateClassPlanDTO = req.body
    const classPlan = await this.updateClassPlanUseCase.execute(id, data)
    if (!classPlan)
      return res.status(404).json({ error: 'Plano de aula não encontrado' })
    return res.json(classPlan)
  }
}

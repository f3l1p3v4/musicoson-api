import { ClassPlan } from '../../domain/entities/ClassPlan'
import { Group } from '@prisma/client'
import { CreateClassPlanDTO } from '../../application/dtos/CreateClassPlanDTO'

export interface IClassPlanRepository {
  create(data: CreateClassPlanDTO): Promise<ClassPlan>
  findAll(filters?: { group?: Group; date?: Date }): Promise<ClassPlan[]>
  update(id: string, data: Partial<ClassPlan>): Promise<ClassPlan | null>
}

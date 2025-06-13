import { prisma } from '../../infra/orm/PrismaClient'
import { IClassPlanRepository } from '../../application/interfaces/IClassPlanRepository'
import { ClassPlan } from '../../domain/entities/ClassPlan'
import { CreateClassPlanDTO } from '../../application/dtos/CreateClassPlanDTO'
import { UpdateClassPlanDTO } from '../../application/dtos/UpdateClassPlanDTO'
import { Group } from '@prisma/client'

export class ClassPlanRepository implements IClassPlanRepository {
  async create(data: CreateClassPlanDTO): Promise<ClassPlan> {
    if (!data.instructor_id) {
      throw new Error('Instructor ID is required')
    }

    return prisma.classPlan.create({
      data: {
        group: data.group,
        date: new Date(data.date),
        subject: data.subject,
        page: data.page,
        exercise: data.exercise,
        classNumber: data.classNumber,
        semester: data.semester,
        ano: data.ano,
        method: data.method,
        instructor: {
          connect: { id: data.instructor_id },
        },
      },
    })
  }

  async findAll(filters?: {
    group?: Group
    date?: Date
  }): Promise<ClassPlan[]> {
    return prisma.classPlan.findMany({
      where: {
        group: filters?.group,
        date: filters?.date ? { equals: filters.date } : undefined,
      },
    })
  }

  async update(
    id: string,
    data: UpdateClassPlanDTO,
  ): Promise<ClassPlan | null> {
    return prisma.classPlan.update({ where: { id }, data })
  }
}

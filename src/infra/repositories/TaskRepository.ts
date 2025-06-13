import { PrismaClient, Task, Group } from '@prisma/client'
import { CreateTaskDTO } from '../../../application/dtos/CreateTaskDTO'
import { ITaskRepository } from '../../../application/interfaces/ITaskRepository'

export class TaskRepository implements ITaskRepository {
  private prisma = new PrismaClient()

  async findById(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id },
    })
  }

  async create(data: CreateTaskDTO, instructorId: string): Promise<Task> {
    const existingTask = await this.prisma.task.findFirst({
      where: {
        title: data.title,
        description: data.description,
        category: data.category,
        instructorId,
        studentId: data.studentId ?? undefined,
        group: data.group ?? undefined,
      },
    })

    if (existingTask) {
      throw new Error('Task already exists')
    }

    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        observation: data.observation,
        delivery_date: data.delivery_date,
        status: data.status ?? 'PENDING',
        category: data.category,
        instructorId,
        studentId: data.studentId ?? null,
        group: data.group ?? null,
      },
    })
  }

  async updateStatus(
    id: string,
    status: 'PENDING' | 'COMPLETED',
  ): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: { status },
    })
  }

  async list(): Promise<Task[]> {
    return this.prisma.task.findMany()
  }

  async listByInstructor(instructorId: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        OR: [{ instructorId }, { group: { not: null } }],
      },
    })
  }

  async listByStudent(studentId: string, group: Group): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        OR: [{ studentId }, { group }],
      },
    })
  }

  async delete(id: string): Promise<void> {
    const task = await this.prisma.task.findUnique({ where: { id } })

    if (!task) {
      throw new Error('Task not found')
    }

    await this.prisma.task.delete({ where: { id } })
  }
}

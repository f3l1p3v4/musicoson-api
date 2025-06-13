import { prisma } from '../../infra/orm/PrismaClient'
import { Notice } from '@prisma/client'
import { INoticeRepository } from '../../application/interfaces/INoticeRepository'
import { CreateNoticeDTO } from '../../application/dtos/CreateNoticeDTO'

export class NoticeRepository implements INoticeRepository {
  async create(data: CreateNoticeDTO, instructorId: string): Promise<Notice> {
    return await prisma.notice.create({
      data: {
        ...data,
        instructorId,
      },
    })
  }

  async findAll(): Promise<Notice[]> {
    return await prisma.notice.findMany()
  }

  async update(id: string, data: Partial<CreateNoticeDTO>): Promise<Notice> {
    return await prisma.notice.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.notice.delete({
      where: { id },
    })
  }

  async findById(id: string): Promise<Notice | null> {
    return await prisma.notice.findUnique({
      where: { id },
    })
  }
}

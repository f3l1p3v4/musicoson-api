import { Notice } from '@prisma/client'
import { CreateNoticeDTO } from '../../application/dtos/CreateNoticeDTO'

export interface INoticeRepository {
  create(data: CreateNoticeDTO, instructorId: string): Promise<Notice>
  findAll(): Promise<Notice[]>
  update(id: string, data: Partial<CreateNoticeDTO>): Promise<Notice>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Notice | null>
}

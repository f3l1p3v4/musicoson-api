import { INoticeRepository } from '@/application/interfaces/INoticeRepository'
import { Notice } from '@prisma/client'
import { CreateNoticeDTO } from '@/application/dtos/CreateNoticeDTO'

export class CreateNoticeUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private noticeRepository: INoticeRepository) {}

  async execute(instructorId: string, data: CreateNoticeDTO): Promise<Notice> {
    const notice = await this.noticeRepository.create(data, instructorId)
    return notice
  }
}

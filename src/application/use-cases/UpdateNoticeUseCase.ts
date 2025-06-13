import { INoticeRepository } from '../../application/interfaces/INoticeRepository'
import { Notice } from '@prisma/client'
import { CreateNoticeDTO } from '../../application/dtos/CreateNoticeDTO'

export class UpdateNoticeUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private noticeRepository: INoticeRepository) {}

  async execute(id: string, data: Partial<CreateNoticeDTO>): Promise<Notice> {
    const existingNotice = await this.noticeRepository.findById(id)
    if (!existingNotice) {
      throw new Error('Notice not found')
    }

    const updatedNotice = await this.noticeRepository.update(id, data)
    return updatedNotice
  }
}

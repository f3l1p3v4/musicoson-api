import { INoticeRepository } from '../interfaces/INoticeRepository'

export class DeleteNoticeUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private noticeRepository: INoticeRepository) {}

  async execute(id: string): Promise<void> {
    await this.noticeRepository.delete(id)
  }
}

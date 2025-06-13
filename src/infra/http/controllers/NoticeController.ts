import { Request, Response } from 'express'
import { CreateNoticeUseCase } from '../../../application/use-cases/CreateNoticeUseCase'
import { ListNoticesUseCase } from '../../../application/use-cases/ListNoticesUseCase'
import { UpdateNoticeUseCase } from '../../../application/use-cases/UpdateNoticeUseCase'
import { DeleteNoticeUseCase } from '../../../application/use-cases/DeleteNoticeUseCase'
import { NoticeRepository } from '../../../infra/repositories/NoticeRepository'
import { CreateNoticeDTO } from '../../../application/dtos/CreateNoticeDTO'

const noticeRepository = new NoticeRepository()

class NoticeController {
  static async createNotice(req: Request, res: Response) {
    try {
      const userId = req.userId

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' })
      }

      const data: CreateNoticeDTO = req.body
      const createNoticeUseCase = new CreateNoticeUseCase(noticeRepository)
      const notice = await createNoticeUseCase.execute(userId, data)
      res.status(201).json(notice)
    } catch (error: unknown) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async listNotices(req: Request, res: Response) {
    try {
      const listNoticesUseCase = new ListNoticesUseCase(noticeRepository)
      const notices = await listNoticesUseCase.execute()
      res.status(200).json(notices)
    } catch (error: unknown) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async updateNotice(req: Request, res: Response) {
    try {
      const { id } = req.params
      const data: Partial<CreateNoticeDTO> = req.body
      const userId = req.userId

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' })
      }

      const updateNoticeUseCase = new UpdateNoticeUseCase(noticeRepository)
      const updatedNotice = await updateNoticeUseCase.execute(id, data)
      res.status(200).json(updatedNotice)
    } catch (error: unknown) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async deleteNotice(req: Request, res: Response) {
    try {
      const { id } = req.params
      const userId = req.userId

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' })
      }

      const deleteNoticeUseCase = new DeleteNoticeUseCase(noticeRepository)
      await deleteNoticeUseCase.execute(id)
      res.status(204).send()
    } catch (error: unknown) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default NoticeController

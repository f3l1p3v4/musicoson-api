import { Router } from 'express'
import NoticeController from '../controllers/NoticeController'
import {
  ensureAuthenticated,
  ensureInstructor,
} from '@/infra/http/middlewares/auth'

const router = Router()

router.post(
  '/',
  ensureAuthenticated,
  ensureInstructor,
  NoticeController.createNotice,
)
router.get('/', NoticeController.listNotices)
router.put(
  '/:id',
  ensureAuthenticated,
  ensureInstructor,
  NoticeController.updateNotice,
)
router.delete(
  '/:id',
  ensureAuthenticated,
  ensureInstructor,
  NoticeController.deleteNotice,
)

export { router as NoticeRoute }

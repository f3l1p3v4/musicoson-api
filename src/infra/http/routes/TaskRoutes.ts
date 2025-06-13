import { Router } from 'express'
import TaskController from '../controllers/TaskController'
import {
  ensureAuthenticated,
  ensureInstructor,
} from '../../../infra/http/middlewares/auth'

const router = Router()

router.post(
  '/',
  ensureAuthenticated,
  ensureInstructor,
  TaskController.createTask,
)
router.put(
  '/:id/status',
  ensureAuthenticated,
  ensureInstructor,
  TaskController.updateTaskStatus,
)
router.get('/', ensureAuthenticated, ensureInstructor, TaskController.listTasks)
router.get(
  '/instructor',
  ensureAuthenticated,
  ensureInstructor,
  TaskController.listTasksByInstructor,
)
router.get('/student', ensureAuthenticated, TaskController.listTasksByStudent)
router.delete(
  '/:id',
  ensureAuthenticated,
  ensureInstructor,
  TaskController.deleteTask,
)

export { router as TaskRoutes }

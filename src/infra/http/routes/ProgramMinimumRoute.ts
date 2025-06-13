import { Router } from 'express'
import ProgramMinimumController from '../controllers/ProgramMinimumController'
import {
  ensureAuthenticated,
  ensureInstructor,
} from '../../../infra/http/middlewares/auth'

const router = Router()

router.post(
  '/',
  ensureAuthenticated,
  ensureInstructor,
  ProgramMinimumController.createProgramMinimum,
)
router.get('/', ProgramMinimumController.listProgramMinimums)
router.put(
  '/:id',
  ensureAuthenticated,
  ensureInstructor,
  ProgramMinimumController.updateProgramMinimum,
)
router.delete(
  '/:id',
  ensureAuthenticated,
  ensureInstructor,
  ProgramMinimumController.deleteProgramMinimum,
)

export { router as ProgramMinimumRoute }

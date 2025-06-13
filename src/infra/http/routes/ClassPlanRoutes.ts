import { Router } from 'express'
import { ClassPlanController } from '../../../infra/http/controllers/ClassPlanController'
import {
  ensureAuthenticated,
  ensureInstructor,
} from '../../../infra/http/middlewares/auth'
import { ClassPlanRepository } from '../../../infra/repositories/ClassPlanRepository'
import { CreateClassPlanUseCase } from '../../../application/use-cases/CreateClassPlanUseCase'
import { ListClassPlansUseCase } from '../../../application/use-cases/ListClassPlansUseCase'
import { UpdateClassPlanUseCase } from '../../../application/use-cases/UpdateClassPlanUseCase'

const router = Router()
const classPlanRepository = new ClassPlanRepository()
const classPlanController = new ClassPlanController(
  new CreateClassPlanUseCase(classPlanRepository),
  new ListClassPlansUseCase(classPlanRepository),
  new UpdateClassPlanUseCase(classPlanRepository),
)

router.post(
  '/',
  ensureAuthenticated,
  ensureInstructor,
  classPlanController.create.bind(classPlanController),
)
router.get(
  '/',
  ensureAuthenticated,
  classPlanController.list.bind(classPlanController),
)
router.put(
  '/:id',
  ensureAuthenticated,
  ensureInstructor,
  classPlanController.update.bind(classPlanController),
)

export { router as classPlanRoutes }

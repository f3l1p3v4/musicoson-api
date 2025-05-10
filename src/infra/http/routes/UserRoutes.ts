import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import {
  ensureAuthenticated,
  ensureInstructor,
} from '@/infra/http/middlewares/auth'

const routes = Router()
const userController = new UserController()

routes.get(
  '/',
  ensureAuthenticated,
  ensureInstructor,
  userController.list.bind(userController),
)
routes.get(
  '/:id',
  ensureAuthenticated,
  userController.findById.bind(userController),
)
routes.post('/register', userController.register.bind(userController))
routes.post('/login', userController.authenticate.bind(userController))
routes.put(
  '/:id',
  ensureAuthenticated,
  ensureInstructor,
  userController.update.bind(userController),
)
routes.delete(
  '/:id',
  ensureAuthenticated,
  ensureInstructor,
  userController.delete.bind(userController),
)

export { routes as UserRoutes }

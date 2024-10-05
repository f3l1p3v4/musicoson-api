import { Request, Response } from 'express'
import { RegisterUserUseCase } from '@/application/use-cases/RegisterUserUseCase'
import { AuthenticateUserUseCase } from '@/application/use-cases/AuthenticateUserUseCase'
import { UserRepository } from '@/infra/repositories/UserRepository'

export class UserController {
  async register(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      phone,
      password,
      role,
      instrument,
      group,
      practical_level,
    } = req.body

    const userRepository = new UserRepository()
    const registerUserUseCase = new RegisterUserUseCase(userRepository)

    try {
      const user = await registerUserUseCase.execute({
        name,
        email,
        phone,
        password,
        role,
        instrument,
        group,
        practical_level,
      })

      return res.status(201).json(user)
    } catch (err) {
      return res.status(400).json({ error: (err as Error).message })
    }
  }

  async authenticate(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const userRepository = new UserRepository()
    const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)

    try {
      const token = await authenticateUserUseCase.execute({ email, password })
      return res.status(200).json({ token })
    } catch (err) {
      return res.status(400).json({ error: (err as Error).message })
    }
  }
}

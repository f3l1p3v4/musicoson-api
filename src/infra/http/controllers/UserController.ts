import { Request, Response } from 'express'
import { RegisterUserUseCase } from '@/application/use-cases/RegisterUserUseCase'
import { AuthenticateUserUseCase } from '@/application/use-cases/AuthenticateUserUseCase'
import { UpdateUserUseCase } from '@/application/use-cases/UpdateUserUseCase'
import { DeleteUserUseCase } from '@/application/use-cases/DeleteUserUseCase'
import { UserRepository } from '@/infra/repositories/UserRepository'
import { UserSchema } from '@/application/schemas/UserSchema'
import { z } from 'zod'
import { formatZodErrors } from '@/utils/formatZodErrors'

export class UserController {
  private registerUserUseCase: RegisterUserUseCase
  private authenticateUserUseCase: AuthenticateUserUseCase
  private updateUserUseCase: UpdateUserUseCase
  private deleteUserUseCase: DeleteUserUseCase

  constructor() {
    const userRepository = new UserRepository()
    this.registerUserUseCase = new RegisterUserUseCase(userRepository)
    this.authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)
    this.updateUserUseCase = new UpdateUserUseCase(userRepository)
    this.deleteUserUseCase = new DeleteUserUseCase(userRepository)
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const userRepository = new UserRepository()
      const users = await userRepository.findAll()
      return res.status(200).json(users)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message })
      }
      return res.status(500).json({ error: 'An unexpected error occurred' })
    }
  }

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const userData = UserSchema.parse(req.body)

      const user = await this.registerUserUseCase.execute(userData)
      return res.status(201).json(user)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = formatZodErrors(error.errors)
        return res.status(400).json({ errors: formattedErrors })
      }
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message })
      }
      return res.status(400).json({ error: 'An unexpected error occurred' })
    }
  }

  async authenticate(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body
      const token = await this.authenticateUserUseCase.execute({
        email,
        password,
      })
      return res.status(200).json({ token })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ error: error.message })
      }
      return res.status(401).json({ error: 'An unexpected error occurred' })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const data = req.body
      const updatedUser = await this.updateUserUseCase.execute(id, data)
      return res.status(200).json(updatedUser)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message })
      }
      return res.status(400).json({ error: 'An unexpected error occurred' })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      await this.deleteUserUseCase.execute(id)
      return res.status(204).send()
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message })
      }
      return res.status(400).json({ error: 'An unexpected error occurred' })
    }
  }
}

import { IUserRepository } from '../interfaces/IUserRepository'
import { AuthenticateUserDTO } from '@/application/dtos/AuthenticateUserDTO'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserRole } from '@prisma/client'

interface ITokenPayload {
  userId: string
  email: string
  role: UserRole
}

export class AuthenticateUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private userRepository: IUserRepository) {}

  async execute(data: AuthenticateUserDTO): Promise<{
    token: string
    role: UserRole
    name: string
    instrument?: string
    id?: string
  }> {
    const user = await this.userRepository.findByEmail(data.email)

    if (!user) {
      throw new AuthenticationError('Invalid email or password.')
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.password_hash,
    )

    if (!passwordMatch) {
      throw new AuthenticationError('Invalid email or password.')
    }

    const tokenPayload: ITokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: '8h',
    })

    return {
      token,
      role: user.role,
      name: user.name,
      instrument: user.instrument ?? undefined,
      id: user.id ?? undefined,
    }
  }
}

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthenticationError'
  }
}

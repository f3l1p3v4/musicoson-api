import { IUserRepository } from '../interfaces/IUserRepository'
import { RegisterUserDTO } from '../dtos/RegisterUserDTO'
import { User } from '../../domain/entities/User'
import bcrypt from 'bcryptjs'
import { UserRole, Group, PracticalLevel } from '@prisma/client'

export class RegisterUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private userRepository: IUserRepository) {}

  async execute(data: RegisterUserDTO): Promise<User> {
    const userExists = await this.userRepository.findByEmail(data.email)

    if (userExists) {
      throw new Error('User already exists.')
    }

    const password_hash = await bcrypt.hash(data.password, 8)

    const user = new User(
      '',
      data.name,
      data.email,
      data.phone,
      password_hash,
      data.role as UserRole,
      new Date(),
      new Date(),
      data.instrument,
      data.group as Group,
      data.practical_level as PracticalLevel,
    )

    return await this.userRepository.save(user)
  }
}

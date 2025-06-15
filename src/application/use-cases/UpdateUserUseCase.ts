import { IUserRepository } from '../interfaces/IUserRepository'
import { User } from '../../domain/entities/User'

export class UpdateUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await this.userRepository.update(id, data)
    return updatedUser
  }
}

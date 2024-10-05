import { IUserRepository } from '../interfaces/IUserRepository'

export class DeleteUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}

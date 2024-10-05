import { User } from '../../domain/entities/User'

export interface IUserRepository {
  save(user: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
  update(id: string, data: Partial<User>): Promise<User>
  delete(id: string): Promise<void>
  findAll(): Promise<User[]>
}

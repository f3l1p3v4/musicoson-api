import { prisma } from '../orm/PrismaClient'
import { IUserRepository } from '../../application/interfaces/IUserRepository'
import { User } from '../../domain/entities/User'
import { User as PrismaUser } from '@prisma/client'
import { DuplicateUserError } from '../../application/errors/DuplicateUserError'

export class UserRepository implements IUserRepository {
  async save(user: User): Promise<User> {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: user.email }, { phone: user.phone }],
      },
    })

    if (existingUser) {
      throw new DuplicateUserError('Email or phone number already in use')
    }

    const savedUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        password_hash: user.password_hash,
        role: user.role,
        instrument: user.instrument,
        group: user.group,
        practical_level: user.practical_level,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
    return this.mapPrismaUserToUser(savedUser)
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await prisma.user.findUnique({
      where: { email },
    })

    if (!prismaUser) return null

    return this.mapPrismaUserToUser(prismaUser)
  }

  async findById(id: string) {
    const prismaUser = await prisma.user.findUnique({
      where: { id },
    })

    if (!prismaUser) return null

    return this.mapPrismaUserToUser(prismaUser)
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    })
    return this.mapPrismaUserToUser(updatedUser)
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    })
  }

  async findAll(): Promise<User[]> {
    const prismaUsers = await prisma.user.findMany()
    return prismaUsers.map(this.mapPrismaUserToUser)
  }

  private mapPrismaUserToUser(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.name,
      prismaUser.email,
      prismaUser.phone,
      prismaUser.password_hash,
      prismaUser.role,
      prismaUser.createdAt,
      prismaUser.updatedAt,
      prismaUser.instrument,
      prismaUser.group,
      prismaUser.practical_level,
    )
  }
}

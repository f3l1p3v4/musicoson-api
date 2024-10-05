import { UserRole, Group, PracticalLevel } from '@prisma/client'

export class User {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public password_hash: string,
    public role: UserRole,
    public createdAt: Date,
    public updatedAt: Date,
    public instrument?: string | null,
    public group?: Group | null,
    public practical_level?: PracticalLevel | null,
  ) {}
}

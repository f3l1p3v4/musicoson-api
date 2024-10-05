import { UserRole } from '@prisma/client'

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string
    userRole?: UserRole
  }
}

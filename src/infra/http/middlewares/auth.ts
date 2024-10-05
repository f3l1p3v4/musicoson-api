import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '@/infra/orm/PrismaClient'
import { UserRole } from '@prisma/client'

interface JwtPayload {
  userId: string
}

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    req.userId = decoded.userId

    const user = await prisma.user.findUnique({ where: { id: req.userId } })

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    req.userRole = user.role
    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}

export const ensureInstructor = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.userRole !== UserRole.INSTRUCTOR) {
    return res.status(403).json({ error: 'Access denied' })
  }
  return next()
}

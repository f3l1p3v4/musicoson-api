import { PrismaClient, UserRole, Group, PracticalLevel } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await hash('123456', 12)

  // Criar usuário administrador/instrutor
  const instructor = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@teste.com',
      phone: '5511999999999',
      password_hash: passwordHash,
      role: UserRole.INSTRUCTOR,
      instrument: 'Teste',
      group: Group.GROUP_01,
      practical_level: PracticalLevel.OFICIALIZACAO,
    },
  })

  // Criar usuário estudante
  const student = await prisma.user.create({
    data: {
      name: 'Estudante Exemplo',
      email: 'estudante@musicoson.com',
      phone: '5511888888888',
      password_hash: passwordHash,
      role: UserRole.STUDENT,
      instrument: 'Trombone',
      group: Group.GROUP_02,
      practical_level: PracticalLevel.C_JOVEM,
    },
  })

  console.log({
    instructor: {
      id: instructor.id,
      email: instructor.email,
      password: '123456', // Senha em claro apenas para referência
    },
    student: {
      id: student.id,
      email: student.email,
      password: '123456', // Senha em claro apenas para referência
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

import {
  PrismaClient,
  Attendance,
  AttendanceStatus,
  ClassPlan,
} from '@prisma/client'
import { IAttendanceRepository } from '@/application/interfaces/IAttendanceRepository'
import { User } from '../../domain/entities/User'

export class AttendanceRepository implements IAttendanceRepository {
  private prisma = new PrismaClient()

  async createAttendance(
    date: Date,
    studentId: string | null,
    instructorId: string,
    status: AttendanceStatus,
    classNumber: number | null,
  ): Promise<Attendance> {
    return this.prisma.attendance.create({
      data: {
        date,
        studentId,
        instructorId,
        status,
        classNumber,
      },
    })
  }

  async findAttendanceByDateAndStudent(
    date: Date | string,
    studentId: string,
  ): Promise<Attendance | null> {
    const validDate = new Date(date)

    if (isNaN(validDate.getTime())) {
      throw new Error('Data inválida')
    }

    const formattedDate = validDate.toISOString().split('T')[0] // Formata a data para 'YYYY-MM-DD'

    return this.prisma.attendance.findFirst({
      where: {
        studentId,
        // Busca pela data, ignorando hora, minuto e segundo
        date: {
          gte: new Date(`${formattedDate}T00:00:00.000Z`), // Começo do dia
          lte: new Date(`${formattedDate}T23:59:59.999Z`), // Fim do dia
        },
      },
    })
  }

  // async upsertAttendanceStatusByDateAndStudent(
  //   date: Date | string,
  //   studentId: string,
  //   instructorId: string,
  //   status: AttendanceStatus,
  // ): Promise<Attendance> {
  //   const validDate = new Date(date)
  //   if (isNaN(validDate.getTime())) {
  //     throw new Error('Data inválida')
  //   }

  //   const formattedDate = validDate.toISOString().split('T')[0] // 'YYYY-MM-DD'

  //   // Tenta encontrar a presença existente do aluno para essa data
  //   const existingAttendance = await this.prisma.attendance.findFirst({
  //     where: {
  //       studentId,
  //       date: {
  //         gte: new Date(`${formattedDate}T00:00:00.000Z`),
  //         lte: new Date(`${formattedDate}T23:59:59.999Z`),
  //       },
  //     },
  //   })

  //   // Se já existe e o status é diferente → atualiza
  //   if (existingAttendance) {
  //     if (existingAttendance.status !== status) {
  //       return this.prisma.attendance.update({
  //         where: { id: existingAttendance.id },
  //         data: { status },
  //       })
  //     } else {
  //       // Se status já é o mesmo, retorna a presença sem atualizar
  //       return existingAttendance
  //     }
  //   }

  //   // Se não existe, cria nova presença (calculando classNumber)
  //   const classNumber = await this.findClassNumberForDate(validDate)

  //   return this.prisma.attendance.create({
  //     data: {
  //       date: validDate,
  //       studentId,
  //       instructorId,
  //       status,
  //       classNumber,
  //     },
  //   })
  // }

  async findClassNumberForDate(date: Date): Promise<number> {
    const validDate = new Date(date)
    const formattedDate = validDate.toISOString().split('T')[0] // Formata a data para 'YYYY-MM-DD'

    // Primeiro verifica se já existe alguma presença com essa data
    // (usando apenas a parte da data, ignorando hora)
    const existingAttendance = await this.prisma.attendance.findFirst({
      where: {
        date: {
          gte: new Date(`${formattedDate}T00:00:00.000Z`), // Começo do dia
          lte: new Date(`${formattedDate}T23:59:59.999Z`), // Fim do dia
        },
      },
      orderBy: { date: 'asc' },
      select: { classNumber: true },
    })

    // Se já existe uma presença para essa data, use o mesmo classNumber
    if (existingAttendance && existingAttendance.classNumber !== null) {
      return existingAttendance.classNumber
    }

    // Se não existe, precisamos encontrar o próximo classNumber
    // Buscar o maior classNumber atual
    const lastAttendance = await this.prisma.attendance.findFirst({
      orderBy: { classNumber: 'desc' },
      select: { classNumber: true },
    })

    // Retorna o próximo número (ou 1 se não houver nenhum)
    return (lastAttendance?.classNumber || 0) + 1
  }

  async findLastGlobalClassNumber(): Promise<number | null> {
    const lastAttendance = await this.prisma.attendance.findFirst({
      orderBy: { classNumber: 'desc' }, // Busca o maior número de aula registrado
      select: { classNumber: true },
    })

    return lastAttendance?.classNumber || null // Retorna o maior classNumber ou null se não houver presenças
  }

  async getUserAttendancesWithClassPlans(userId: string): Promise<ClassPlan[]> {
    const student = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
        group: true,
      },
    })

    if (!student || student.role !== 'STUDENT' || !student.group) {
      throw new Error('Aluno não encontrado ou sem grupo definido.')
    }

    // 1. Busca todas as aulas (ClassPlan) daquele grupo
    const classPlans = await this.prisma.classPlan.findMany({
      where: {
        group: student.group,
      },
      orderBy: {
        date: 'asc',
      },
    })

    // 2. Busca todos os registros de presença do aluno
    const attendances = await this.prisma.attendance.findMany({
      where: {
        studentId: student.id,
      },
    })

    // 3. Mapeia as aulas e associa a presença via classNumber
    const result = classPlans.map((plan) => {
      const attendance = attendances.find(
        (att) => att.classNumber === plan.classNumber,
      )

      return {
        ...plan,
        attendance: attendance || null,
      }
    })

    return result
  }

  // Método para atualizar o status da presença
  async updateAttendanceStatus(
    attendanceId: string,
    status: AttendanceStatus, // Usando o enum AttendanceStatus
  ): Promise<Attendance> {
    return this.prisma.attendance.update({
      where: { id: attendanceId },
      data: { status },
    })
  }

  // Método para buscar todas as presenças
  async getAllAttendances(): Promise<Attendance[]> {
    return this.prisma.attendance.findMany()
  }

  async getAllStudentsWithAttendance(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { role: 'STUDENT' },
      orderBy: { name: 'asc' },
      include: {
        studentAttendance: {
          select: {
            id: true,
            date: true,
            status: true,
            classNumber: true,
          },
          orderBy: { date: 'asc' },
        },
      },
    })
  }

  async getStudentClassPlansWithAttendance(
    userId: string,
  ): Promise<ClassPlan[]> {
    // 1. Verifica se o usuário existe e é aluno
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true, group: true },
    })

    if (!user || user.role !== 'STUDENT' || !user.group) {
      throw new Error('Usuário inválido ou não é um aluno com grupo definido.')
    }

    // 2. Busca os ClassPlans do grupo do aluno
    return this.prisma.classPlan.findMany({
      where: { group: user.group },
      orderBy: { date: 'asc' },
      include: {
        ClassPlanAttendance: {
          where: { studentId: user.id }, // Somente presenças desse aluno
          select: {
            id: true,
            status: true,
            classNumber: true,
          },
        },
      },
    })
  }

  // Método para buscar uma presença por ID
  async getAttendanceById(attendanceId: string): Promise<Attendance | null> {
    return this.prisma.attendance.findUnique({
      where: { id: attendanceId },
    })
  }

  // Método para deletar uma presença
    async deleteAttendance(attendanceId: string): Promise<void> {
    await this.prisma.attendance.delete({
      where: { id: attendanceId },
    })
  }
}

import {
  PrismaClient,
  Attendance,
  AttendanceStatus,
  ClassPlan,
} from '@prisma/client'
import { IAttendanceRepository, AttendanceFilters } from '../../application/interfaces/IAttendanceRepository'
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

    const formattedDate = validDate.toISOString().split('T')[0]

    return this.prisma.attendance.findFirst({
      where: {
        studentId,
        date: {
          gte: new Date(`${formattedDate}T00:00:00.000Z`),
          lte: new Date(`${formattedDate}T23:59:59.999Z`),
        },
      },
    })
  }

  async findClassNumberForDate(date: Date): Promise<number> {
    const validDate = new Date(date)
    const formattedDate = validDate.toISOString().split('T')[0]

    const existingAttendance = await this.prisma.attendance.findFirst({
      where: {
        date: {
          gte: new Date(`${formattedDate}T00:00:00.000Z`),
          lte: new Date(`${formattedDate}T23:59:59.999Z`),
        },
      },
      orderBy: { date: 'asc' },
      select: { classNumber: true },
    })

    if (existingAttendance && existingAttendance.classNumber !== null) {
      return existingAttendance.classNumber
    }

    const lastAttendanceWithDate = await this.prisma.attendance.findFirst({
      orderBy: { date: 'desc' },
      select: { date: true, classNumber: true },
    })

    if (!lastAttendanceWithDate) {
      return 1
    }

    const lastDate = new Date(lastAttendanceWithDate.date)
    const currentYear = validDate.getFullYear()
    const lastYear = lastDate.getFullYear()
    const currentMonth = validDate.getMonth()
    const lastMonth = lastDate.getMonth()

    const isNewSemester =
      currentYear > lastYear ||
      (currentYear === lastYear && lastMonth < 6 && currentMonth >= 6) ||
      (currentYear === lastYear && lastMonth === 5 && currentMonth === 6)

    if (isNewSemester) {
      return 1
    }

    return (lastAttendanceWithDate.classNumber || 0) + 1
  }

  async findLastGlobalClassNumber(): Promise<number | null> {
    const lastAttendance = await this.prisma.attendance.findFirst({
      orderBy: { classNumber: 'desc' },
      select: { classNumber: true },
    })

    return lastAttendance?.classNumber || null
  }

  async getUserAttendancesWithClassPlans(filters?: AttendanceFilters): Promise<ClassPlan[]> {
    const student = await this.prisma.user.findUnique({
      where: { id: filters?.studentId },
      select: {
        id: true,
        role: true,
        group: true,
      },
    })

    if (!student || student.role !== 'STUDENT' || !student.group) {
      throw new Error('Aluno não encontrado ou sem grupo definido.')
    }

  const classPlans = await this.prisma.classPlan.findMany({
    where: {
      group: student.group,
      date: filters?.date
        ? { gte: filters.date }
        : undefined,
    },
    orderBy: { date: 'asc' },
  })

  const attendances = await this.prisma.attendance.findMany({
    where: {
      studentId: student.id,
      date: filters?.date
        ? { gte: filters.date }
        : undefined,
    },
  })

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

  async updateAttendanceStatus(
    attendanceId: string,
    status: AttendanceStatus,
  ): Promise<Attendance> {
    return this.prisma.attendance.update({
      where: { id: attendanceId },
      data: { status },
    })
  }

  async getAllAttendances(filters?: AttendanceFilters): Promise<Attendance[]> {
    return this.prisma.attendance.findMany({
      where: {
        date: filters?.startDate && filters?.endDate
          ? { gte: filters.startDate, lte: filters.endDate }
          : filters?.date
            ? { gte: filters.date }
            : undefined,
      },
    })
  }

  async getAllStudentsWithAttendance(filters?: {
    date?: Date
    startDate?: Date
    endDate?: Date
  }): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        role: 'STUDENT',
      },
      orderBy: { name: 'asc' },
      include: {
        studentAttendance: {
          where: {
            date: filters?.startDate && filters?.endDate
              ? {
                  gte: filters.startDate,
                  lte: filters.endDate,
                }
              : filters?.date
                ? { gte: filters.date }
                : undefined,
          },
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
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true, group: true },
    })

    if (!user || user.role !== 'STUDENT' || !user.group) {
      throw new Error('Usuário inválido ou não é um aluno com grupo definido.')
    }

    return this.prisma.classPlan.findMany({
      where: { group: user.group },
      orderBy: { date: 'asc' },
      include: {
        ClassPlanAttendance: {
          where: { studentId: user.id },
          select: {
            id: true,
            status: true,
            classNumber: true,
          },
        },
      },
    })
  }

  async getAttendanceById(attendanceId: string): Promise<Attendance | null> {
    return this.prisma.attendance.findUnique({
      where: { id: attendanceId },
    })
  }

  async deleteAttendance(attendanceId: string): Promise<void> {
    await this.prisma.attendance.delete({
      where: { id: attendanceId },
    })
  }
}


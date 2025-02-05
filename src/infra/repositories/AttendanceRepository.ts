import { PrismaClient, Attendance, AttendanceStatus } from '@prisma/client'
import { IAttendanceRepository } from '@/application/interfaces/IAttendanceRepository'

export class AttendanceRepository implements IAttendanceRepository {
  private prisma = new PrismaClient()

  // Método para criar a presença
  async createAttendance(
    date: Date,
    studentId: string | null,
    instructorId: string,
    status: AttendanceStatus, // Usando o enum AttendanceStatus
  ): Promise<Attendance> {
    return this.prisma.attendance.create({
      data: {
        date,
        studentId,
        instructorId,
        status, // Agora, status deve ser do tipo AttendanceStatus
      },
    })
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

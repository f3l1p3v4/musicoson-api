import { IAttendanceRepository } from '../../application/interfaces/IAttendanceRepository'
import { Attendance, AttendanceStatus } from '@prisma/client' // Importe o AttendanceStatus aqui

export class UpdateAttendanceStatusUseCase {
  constructor(private attendanceRepository: IAttendanceRepository) {}

  // Altere o tipo de 'status: string' para 'status: AttendanceStatus'
  async execute(attendanceId: string, status: AttendanceStatus): Promise<Attendance> {
    const updatedAttendance =
      await this.attendanceRepository.updateAttendanceStatus(
        attendanceId,
        status,
      )
    return updatedAttendance
  }
}
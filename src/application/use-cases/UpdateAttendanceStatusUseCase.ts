import { IAttendanceRepository } from '../../application/interfaces/IAttendanceRepository'
import { Attendance } from '@prisma/client'

export class UpdateAttendanceUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private attendanceRepository: IAttendanceRepository) {}

  async execute(attendanceId: string, status: string): Promise<Attendance> {
    const updatedAttendance =
      await this.attendanceRepository.updateAttendanceStatus(
        attendanceId,
        status,
      )
    return updatedAttendance
  }
}

import { IAttendanceRepository } from '../../application/interfaces/IAttendanceRepository'
import { Attendance } from '@prisma/client'

export class ListAttendanceUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private attendanceRepository: IAttendanceRepository) {}

  async execute(): Promise<Attendance[]> {
    const attendances = await this.attendanceRepository.getAllAttendances()
    return attendances
  }
}

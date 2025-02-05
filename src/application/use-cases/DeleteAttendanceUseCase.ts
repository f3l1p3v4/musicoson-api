import { IAttendanceRepository } from '../interfaces/IAttendanceRepository'

export class DeleteAttendanceUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private attendanceRepository: IAttendanceRepository) {}

  async execute(attendanceId: string): Promise<void> {
    await this.attendanceRepository.deleteAttendance(attendanceId)
  }
}

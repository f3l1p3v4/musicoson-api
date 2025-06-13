import { IAttendanceRepository } from '../../application/interfaces/IAttendanceRepository'
import { Attendance } from '@prisma/client'
import { CreateAttendanceDTO } from '../../application/dtos/CreateAttendanceDTO'

export class CreateAttendanceUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private attendanceRepository: IAttendanceRepository) {}

  async execute(data: CreateAttendanceDTO): Promise<Attendance> {
    // Lógica adicional, se necessário, como validação
    return await this.attendanceRepository.createAttendance(
      data.date,
      data.studentId, // studentId pode ser string ou null
      data.instructorId,
      data.status,
      data.classNumber, // Adicionando o argumento classNumber
    )
  }
}

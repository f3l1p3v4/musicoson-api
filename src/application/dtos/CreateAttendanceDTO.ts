import { AttendanceStatus } from '@prisma/client'

export interface CreateAttendanceDTO {
  date: Date
  studentId: string | null // Permitir null
  instructorId: string
  status: AttendanceStatus
}

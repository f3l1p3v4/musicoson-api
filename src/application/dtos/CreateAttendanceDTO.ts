import { AttendanceStatus } from '@prisma/client'

export interface CreateAttendanceDTO {
  date: Date
  studentId: string | null
  instructorId: string
  status: AttendanceStatus
  classNumber: number | null
}

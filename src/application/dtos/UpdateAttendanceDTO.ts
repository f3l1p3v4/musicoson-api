import { AttendanceStatus } from '@prisma/client'

export interface UpdateAttendanceDTO {
  status: AttendanceStatus
}

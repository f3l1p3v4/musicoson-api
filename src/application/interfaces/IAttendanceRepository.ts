import { Attendance } from '@prisma/client'

export interface IAttendanceRepository {
  createAttendance(
    date: Date,
    studentId: string | null,
    instructorId: string,
    status: string,
  ): Promise<Attendance>
  updateAttendanceStatus(
    attendanceId: string,
    status: string,
  ): Promise<Attendance>
  getAllAttendances(): Promise<Attendance[]>
  getAttendanceById(attendanceId: string): Promise<Attendance | null>
  deleteAttendance(attendanceId: string): Promise<void>
}

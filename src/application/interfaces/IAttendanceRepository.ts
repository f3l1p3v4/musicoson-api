// src/application/interfaces/IAttendanceRepository.ts
import { Attendance, AttendanceStatus, ClassPlan } from '@prisma/client'

// Definimos um tipo para os filtros para facilitar o reuso
export interface AttendanceFilters {
  date?: Date;
  startDate?: Date;
  endDate?: Date;
  studentId?: string;
}

export interface IAttendanceRepository {
  createAttendance(
    date: Date,
    studentId: string | null,
    instructorId: string,
    status: AttendanceStatus,
    classNumber: number | null,
  ): Promise<Attendance>

  findAttendanceByDateAndStudent(
    date: Date | string,
    studentId: string,
  ): Promise<Attendance | null>

  findClassNumberForDate(date: Date): Promise<number>

  // Atualizado para aceitar filtros
  getAllAttendances(filters?: AttendanceFilters): Promise<Attendance[]>
  
  // Atualizado para aceitar filtros
  getAllStudentsWithAttendance(filters?: AttendanceFilters): Promise<any[]>
  
  // Atualizado para aceitar filtros
  getUserAttendancesWithClassPlans(filters?: AttendanceFilters): Promise<any[]>

  updateAttendanceStatus(
    attendanceId: string,
    status: AttendanceStatus,
  ): Promise<Attendance>

  getAttendanceById(attendanceId: string): Promise<Attendance | null>
  
  deleteAttendance(attendanceId: string): Promise<void>
}
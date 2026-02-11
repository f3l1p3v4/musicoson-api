"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAttendanceStatusUseCase = void 0;
class UpdateAttendanceStatusUseCase {
    constructor(attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }
    // Altere o tipo de 'status: string' para 'status: AttendanceStatus'
    async execute(attendanceId, status) {
        const updatedAttendance = await this.attendanceRepository.updateAttendanceStatus(attendanceId, status);
        return updatedAttendance;
    }
}
exports.UpdateAttendanceStatusUseCase = UpdateAttendanceStatusUseCase;
//# sourceMappingURL=UpdateAttendanceStatusUseCase.js.map
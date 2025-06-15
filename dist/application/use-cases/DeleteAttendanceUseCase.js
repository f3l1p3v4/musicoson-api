"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAttendanceUseCase = void 0;
class DeleteAttendanceUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }
    async execute(attendanceId) {
        await this.attendanceRepository.deleteAttendance(attendanceId);
    }
}
exports.DeleteAttendanceUseCase = DeleteAttendanceUseCase;
//# sourceMappingURL=DeleteAttendanceUseCase.js.map
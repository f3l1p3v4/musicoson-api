"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAttendanceUseCase = void 0;
class UpdateAttendanceUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }
    async execute(attendanceId, status) {
        const updatedAttendance = await this.attendanceRepository.updateAttendanceStatus(attendanceId, status);
        return updatedAttendance;
    }
}
exports.UpdateAttendanceUseCase = UpdateAttendanceUseCase;
//# sourceMappingURL=UpdateAttendanceStatusUseCase.js.map
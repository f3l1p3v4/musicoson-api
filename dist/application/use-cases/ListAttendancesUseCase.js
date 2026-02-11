"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAttendanceUseCase = void 0;
class ListAttendanceUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }
    async execute() {
        const attendances = await this.attendanceRepository.getAllAttendances();
        return attendances;
    }
}
exports.ListAttendanceUseCase = ListAttendanceUseCase;
//# sourceMappingURL=ListAttendancesUseCase.js.map
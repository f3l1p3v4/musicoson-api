"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAttendanceUseCase = void 0;
class CreateAttendanceUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }
    async execute(data) {
        // Lógica adicional, se necessário, como validação
        return await this.attendanceRepository.createAttendance(data.date, data.studentId, // studentId pode ser string ou null
        data.instructorId, data.status, data.classNumber);
    }
}
exports.CreateAttendanceUseCase = CreateAttendanceUseCase;
//# sourceMappingURL=CreateAttendanceUseCase.js.map
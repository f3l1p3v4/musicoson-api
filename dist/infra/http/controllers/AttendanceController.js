"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAttendanceController = void 0;
const AttendanceRepository_1 = require("../../../infra/repositories/AttendanceRepository");
class AttendanceController {
    constructor(attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }
    async createAttendance(req, res) {
        const studentId = req.body.studentId || req.params.studentId;
        const { date, instructorId, status } = req.body;
        try {
            const formattedDate = new Date(date);
            if (isNaN(formattedDate.getTime())) {
                return res.status(400).json({ message: 'Data inválida' });
            }
            const existingAttendance = await this.attendanceRepository.findAttendanceByDateAndStudent(formattedDate, studentId);
            if (existingAttendance) {
                const existingDate = existingAttendance.date.toISOString().split('T')[0];
                const incomingDate = formattedDate.toISOString().split('T')[0];
                if (existingDate === incomingDate &&
                    existingAttendance.status === status) {
                    return res.status(200).json({
                        message: 'A presença já foi registrada!',
                        attendance: existingAttendance,
                    });
                }
                else if (existingDate === incomingDate &&
                    existingAttendance.status !== status) {
                    return res.status(200).json({
                        message: 'A presença já foi registrada! com um status diferente',
                        attendance: existingAttendance,
                    });
                }
            }
            const classNumber = await this.attendanceRepository.findClassNumberForDate(formattedDate);
            const newAttendance = await this.attendanceRepository.createAttendance(formattedDate, studentId, instructorId, status, classNumber);
            return res.status(201).json({
                message: `Registrando presença para aula #${classNumber} na data ${formattedDate.toISOString().split('T')[0]}`,
                newAttendance,
            });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            return res
                .status(500)
                .json({ message: 'Erro interno do servidor', error: errorMessage });
        }
    }
    async listAttendances(req, res) {
        try {
            const { year, period } = req.query;
            if (year && period) {
                const parsedYear = parseInt(year);
                const parsedPeriod = parseInt(period);
                const startMonth = parsedPeriod === 1 ? 0 : 6;
                const endMonth = parsedPeriod === 1 ? 5 : 11;
                const endDay = parsedPeriod === 1 ? 30 : 31;
                const startDate = new Date(parsedYear, startMonth, 1);
                const endDate = new Date(parsedYear, endMonth, endDay, 23, 59, 59);
                const filters = {
                    startDate,
                    endDate,
                };
                const attendances = await this.attendanceRepository.getAllAttendances(filters);
                return res.status(200).json(attendances);
            }
            const filters = {
                date: new Date(new Date().getFullYear(), 0, 1)
            };
            const attendances = await this.attendanceRepository.getAllAttendances(filters);
            return res.status(200).json(attendances);
        }
        catch (error) {
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
    async getAllStudentsWithAttendance(req, res) {
        try {
            const { year, period } = req.query;
            if (year && period) {
                const parsedYear = parseInt(year);
                const parsedPeriod = parseInt(period);
                const startMonth = parsedPeriod === 1 ? 0 : 6;
                const endMonth = parsedPeriod === 1 ? 5 : 11;
                const endDay = parsedPeriod === 1 ? 30 : 31;
                const startDate = new Date(parsedYear, startMonth, 1);
                const endDate = new Date(parsedYear, endMonth, endDay, 23, 59, 59);
                const filters = {
                    startDate,
                    endDate,
                };
                const studentsWithAttendance = await this.attendanceRepository.getAllStudentsWithAttendance(filters);
                return res.status(200).json(studentsWithAttendance);
            }
            const filters = {
                startDate: new Date(new Date().getFullYear(), 0, 1),
                date: new Date(new Date().getFullYear(), 0, 1)
            };
            const studentsWithAttendance = await this.attendanceRepository.getAllStudentsWithAttendance(filters);
            return res.status(200).json(studentsWithAttendance);
        }
        catch (error) {
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
    async getUserAttendancesWithClassPlans(req, res) {
        const { studentId } = req.params;
        const filters = {
            studentId,
            date: new Date(new Date().getFullYear(), 0, 1)
        };
        try {
            const attendances = await this.attendanceRepository.getUserAttendancesWithClassPlans(filters);
            return res.status(200).json(attendances);
        }
        catch (error) {
            console.error('Erro ao buscar aulas e presenças do aluno:', error);
            return res.status(500).json({
                message: error instanceof Error ? error.message : 'Erro interno do servidor',
            });
        }
    }
    async updateAttendance(req, res) {
        const { id } = req.params;
        const { status } = req.body;
        try {
            const attendance = await this.attendanceRepository.updateAttendanceStatus(id, status);
            return res.status(200).json(attendance);
        }
        catch (error) {
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
    async deleteAttendance(req, res) {
        const { id } = req.params;
        try {
            await this.attendanceRepository.deleteAttendance(id);
            return res.status(204).send();
        }
        catch (error) {
            console.error('Erro ao remover presença:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}
const createAttendanceController = () => {
    const attendanceRepository = new AttendanceRepository_1.AttendanceRepository();
    return new AttendanceController(attendanceRepository);
};
exports.createAttendanceController = createAttendanceController;
//# sourceMappingURL=AttendanceController.js.map
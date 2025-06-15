"use strict";
// src/infra/http/routes/AttendanceRoute.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceRoute = void 0;
const express_1 = require("express");
const AttendanceController_1 = require("../../../infra/http/controllers/AttendanceController");
const auth_1 = require("../../../infra/http/middlewares/auth");
const router = (0, express_1.Router)();
exports.AttendanceRoute = router;
// Cria o controlador com a injeção de dependência
const attendanceController = (0, AttendanceController_1.createAttendanceController)();
// Rota para criar a presença
router.post('/', auth_1.ensureAuthenticated, auth_1.ensureInstructor, (req, res) => attendanceController.createAttendance(req, res));
// Rota para listar todas as presenças
router.get('/', auth_1.ensureAuthenticated, auth_1.ensureInstructor, (req, res) => attendanceController.listAttendances(req, res));
// Rota para obter alunos com suas presenças
router.get('/students', auth_1.ensureAuthenticated, auth_1.ensureInstructor, (req, res) => attendanceController.getAllStudentsWithAttendance(req, res));
// Rota para buscar as aulas de um aluno específico
router.get('/student/:studentId', auth_1.ensureAuthenticated, (req, res) => attendanceController.getUserAttendancesWithClassPlans(req, res));
// Rota para atualizar o status da presença
router.put('/:id', auth_1.ensureAuthenticated, auth_1.ensureInstructor, (req, res) => attendanceController.updateAttendance(req, res));
// Rota para remover a presença
router.delete('/:id', auth_1.ensureAuthenticated, auth_1.ensureInstructor, (req, res) => attendanceController.deleteAttendance(req, res));
//# sourceMappingURL=attendanceRoutes.js.map
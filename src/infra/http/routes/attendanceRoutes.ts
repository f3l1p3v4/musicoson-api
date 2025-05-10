// src/infra/http/routes/AttendanceRoute.ts

import { Router } from 'express'
import { createAttendanceController } from '@/infra/http/controllers/AttendanceController'
import {
  ensureAuthenticated,
  ensureInstructor,
} from '@/infra/http/middlewares/auth'

const router = Router()

// Cria o controlador com a injeção de dependência
const attendanceController = createAttendanceController()

// Rota para criar a presença
router.post('/', ensureAuthenticated, ensureInstructor, (req, res) =>
  attendanceController.createAttendance(req, res),
)

// Rota para listar todas as presenças
router.get('/', ensureAuthenticated, ensureInstructor, (req, res) =>
  attendanceController.listAttendances(req, res),
)

// Rota para obter alunos com suas presenças
router.get('/students', ensureAuthenticated, ensureInstructor, (req, res) =>
  attendanceController.getAllStudentsWithAttendance(req, res),
)

// Rota para buscar as aulas de um aluno específico
router.get('/student/:studentId', ensureAuthenticated, (req, res) =>
  attendanceController.getUserAttendancesWithClassPlans(req, res),
)

// Rota para atualizar o status da presença
router.put('/:id', ensureAuthenticated, ensureInstructor, (req, res) =>
  attendanceController.updateAttendance(req, res),
)

// Rota para remover a presença
router.delete('/:id', ensureAuthenticated, ensureInstructor, (req, res) =>
  attendanceController.deleteAttendance(req, res),
)

export { router as AttendanceRoute }

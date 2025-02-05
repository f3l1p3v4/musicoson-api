// src/infra/http/controllers/AttendanceController.ts

import { Request, Response } from 'express'
import { AttendanceRepository } from '@/infra/repositories/AttendanceRepository'

class AttendanceController {
  private attendanceRepository: AttendanceRepository

  constructor(attendanceRepository: AttendanceRepository) {
    this.attendanceRepository = attendanceRepository
  }

  // Método para criar a presença
  async createAttendance(req: Request, res: Response): Promise<Response> {
    const { date, studentId, instructorId, status } = req.body

    try {
      const attendance = await this.attendanceRepository.createAttendance(
        date,
        studentId,
        instructorId,
        status,
      )
      return res.status(201).json(attendance)
    } catch (error) {
      console.error('Erro ao criar presença:', error)
      return res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }

  // Método para listar todas as presenças
  async listAttendances(req: Request, res: Response): Promise<Response> {
    try {
      const attendances = await this.attendanceRepository.getAllAttendances()
      return res.status(200).json(attendances)
    } catch (error) {
      console.error('Erro ao listar presenças:', error)
      return res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }

  // Método para atualizar o status da presença
  async updateAttendance(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { status } = req.body

    try {
      const attendance = await this.attendanceRepository.updateAttendanceStatus(
        id,
        status,
      )
      return res.status(200).json(attendance)
    } catch (error) {
      console.error('Erro ao atualizar presença:', error)
      return res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }

  // Método para remover uma presença
  async deleteAttendance(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      await this.attendanceRepository.deleteAttendance(id)
      return res.status(204).send()
    } catch (error) {
      console.error('Erro ao remover presença:', error)
      return res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }
}

// Exporte a função que cria o AttendanceController passando o repositório como parâmetro
export const createAttendanceController = () => {
  const attendanceRepository = new AttendanceRepository() // Cria a instância do repositório
  return new AttendanceController(attendanceRepository) // Passa o repositório no construtor
}

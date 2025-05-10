import { Request, Response } from 'express'
import { AttendanceRepository } from '@/infra/repositories/AttendanceRepository'

class AttendanceController {
  private attendanceRepository: AttendanceRepository

  constructor(attendanceRepository: AttendanceRepository) {
    this.attendanceRepository = attendanceRepository
  }

  async createAttendance(req: Request, res: Response): Promise<Response> {
    const { date, studentId, instructorId, status } = req.body

    try {
      // Buscar se já existe uma presença para esse aluno na mesma data
      const existingAttendance =
        await this.attendanceRepository.findAttendanceByDateAndStudent(
          date,
          studentId,
        )

      if (existingAttendance) {
        // Extrai apenas a parte da data para comparação
        const existingDate = existingAttendance.date.toISOString().split('T')[0]
        const incomingDate = new Date(date).toISOString().split('T')[0]

        if (existingDate === incomingDate) {
          return res.status(200).json({
            message: 'A presença já foi registrada!',
          })
        }
      }

      // Definir o classNumber correto baseado na ordem das datas
      const classNumber =
        await this.attendanceRepository.findClassNumberForDate(date)

      // Criar nova presença
      const newAttendance = await this.attendanceRepository.createAttendance(
        date,
        studentId,
        instructorId,
        status,
        classNumber,
      )

      return res.status(201).json(newAttendance)
    } catch (error) {
      console.error('Erro ao criar presença:', error) // Isso vai mostrar o erro real no terminal
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido'
      return res
        .status(500)
        .json({ message: 'Erro interno do servidor', error: errorMessage })
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

  async getAllStudentsWithAttendance(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const studentsWithAttendance =
        await this.attendanceRepository.getAllStudentsWithAttendance()
      return res.status(200).json(studentsWithAttendance)
    } catch (error) {
      console.error('Erro ao buscar alunos com presenças:', error)
      return res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }

  async getUserAttendancesWithClassPlans(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { studentId } = req.params

    try {
      const attendances =
        await this.attendanceRepository.getUserAttendancesWithClassPlans(
          studentId,
        )
      return res.status(200).json(attendances)
    } catch (error) {
      console.error('Erro ao buscar aulas e presenças do aluno:', error)
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : 'Erro interno do servidor',
      })
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

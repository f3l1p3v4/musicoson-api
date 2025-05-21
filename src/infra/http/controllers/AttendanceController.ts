import { Request, Response } from 'express'
import { AttendanceRepository } from '@/infra/repositories/AttendanceRepository'

class AttendanceController {
  private attendanceRepository: AttendanceRepository

  constructor(attendanceRepository: AttendanceRepository) {
    this.attendanceRepository = attendanceRepository
  }

  // async createAttendance(req: Request, res: Response): Promise<Response> {
  //   const { date, studentId, instructorId, status } = req.body

  //   try {
  //     // Formatar a data para garantir consistência
  //     const formattedDate = new Date(date)

  //     if (isNaN(formattedDate.getTime())) {
  //       return res.status(400).json({ message: 'Data inválida' })
  //     }

  //     // Buscar se já existe uma presença para esse aluno na mesma data
  //     const existingAttendance =
  //       await this.attendanceRepository.findAttendanceByDateAndStudent(
  //         formattedDate,
  //         studentId,
  //       )

  //     if (existingAttendance) {
  //       // Extrai apenas a parte da data para comparação
  //       const existingDate = existingAttendance.date.toISOString().split('T')[0]
  //       const incomingDate = formattedDate.toISOString().split('T')[0]

  //       if (
  //         existingDate === incomingDate &&
  //         existingAttendance.status === status
  //       ) {
  //         return res.status(200).json({
  //           message: 'A presença já foi registrada!',
  //           attendance: existingAttendance,
  //         })
  //       } else if (
  //         existingDate === incomingDate &&
  //         existingAttendance.status !== status
  //       ) {
  //         const updatedAttendance = await this.updateAttendance(
  //           studentId,
  //           status,
  //         )

  //         return res.status(201).json({
  //           message: `Alterado status da presença para ${status}`,
  //           updatedAttendance,
  //         })
  //       }
  //     }

  //     // Definir o classNumber correto baseado na data
  //     const classNumber =
  //       await this.attendanceRepository.findClassNumberForDate(formattedDate)

  //     // Criar nova presença
  //     const newAttendance = await this.attendanceRepository.createAttendance(
  //       formattedDate,
  //       studentId,
  //       instructorId,
  //       status,
  //       classNumber,
  //     )

  //     return res.status(201).json({
  //       message: `Registrando presença para aula #${classNumber} na data ${formattedDate.toISOString().split('T')[0]}`,
  //       newAttendance,
  //     })
  //   } catch (error) {
  //     const errorMessage =
  //       error instanceof Error ? error.message : 'Erro desconhecido'
  //     return res
  //       .status(500)
  //       .json({ message: 'Erro interno do servidor', error: errorMessage })
  //   }
  // }

  // Método para listar todas as presenças

  async createAttendance(req: Request, res: Response): Promise<Response> {
    // Pega o studentId do body, ou se não tiver, tenta pegar dos params
    const studentId = req.body.studentId || req.params.studentId
    const { date, instructorId, status } = req.body

    try {
      const formattedDate = new Date(date)

      if (isNaN(formattedDate.getTime())) {
        return res.status(400).json({ message: 'Data inválida' })
      }

      const existingAttendance =
        await this.attendanceRepository.findAttendanceByDateAndStudent(
          formattedDate,
          studentId,
        )

      if (existingAttendance) {
        const existingDate = existingAttendance.date.toISOString().split('T')[0]
        const incomingDate = formattedDate.toISOString().split('T')[0]

        if (
          existingDate === incomingDate &&
          existingAttendance.status === status
        ) {
          return res.status(200).json({
            message: 'A presença já foi registrada!',
            attendance: existingAttendance,
          })
        } else if (
          existingDate === incomingDate &&
          existingAttendance.status !== status
        ) {
          const updatedAttendance =
            await this.attendanceRepository.updateAttendanceStatus(
              studentId,
              status,
            )

          return res.status(201).json({
            message: `Alterado status da presença para ${status}`,
            updatedAttendance,
          })
        }
      }

      const classNumber =
        await this.attendanceRepository.findClassNumberForDate(formattedDate)

      const newAttendance = await this.attendanceRepository.createAttendance(
        formattedDate,
        studentId,
        instructorId,
        status,
        classNumber,
      )

      return res.status(201).json({
        message: `Registrando presença para aula #${classNumber} na data ${formattedDate.toISOString().split('T')[0]}`,
        newAttendance,
      })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido'
      return res
        .status(500)
        .json({ message: 'Erro interno do servidor', error: errorMessage })
    }
  }

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

    console.log('TESTE updateAttendance:: ', id, status)

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

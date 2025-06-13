import { Request, Response } from 'express'
import { CreateProgramMinimumUseCase } from '../../../application/use-cases/CreateProgramMinimumUseCase'
import { ListProgramMinimumsUseCase } from '../../../application/use-cases/ListProgramMinimumsUseCase'
import { UpdateProgramMinimumUseCase } from '../../../application/use-cases/UpdateProgramMinimumUseCase'
import { DeleteProgramMinimumUseCase } from '../../../application/use-cases/DeleteProgramMinimumUseCase'
import { ProgramMinimumRepository } from '../../../infra/repositories/ProgramMinimumRepository'
import { CreateProgramMinimumDTO } from '../../../application/dtos/CreateProgramMinimumDTO'

const programMinimumRepository = new ProgramMinimumRepository()

class ProgramMinimumController {
  static async createProgramMinimum(req: Request, res: Response) {
    try {
      const userId = req.userId

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' })
      }

      const data: CreateProgramMinimumDTO = req.body
      const createProgramMinimumUseCase = new CreateProgramMinimumUseCase(
        programMinimumRepository,
      )
      const programMinimum = await createProgramMinimumUseCase.execute(
        userId,
        data,
      )
      res.status(201).json(programMinimum)
    } catch (error: unknown) {
      console.error('Error creating Program Minimum:', error) // Adiciona logging aqui
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async listProgramMinimums(req: Request, res: Response) {
    try {
      const listProgramMinimumsUseCase = new ListProgramMinimumsUseCase(
        programMinimumRepository,
      )
      const programMinimums = await listProgramMinimumsUseCase.execute()
      res.status(200).json(programMinimums)
    } catch (error: unknown) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async updateProgramMinimum(req: Request, res: Response) {
    try {
      const { id } = req.params
      const data: Partial<CreateProgramMinimumDTO> = req.body
      const userId = req.userId

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' })
      }

      const updateProgramMinimumUseCase = new UpdateProgramMinimumUseCase(
        programMinimumRepository,
      )
      const updatedProgramMinimum = await updateProgramMinimumUseCase.execute(
        id,
        data,
      )
      res.status(200).json(updatedProgramMinimum)
    } catch (error: unknown) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async deleteProgramMinimum(req: Request, res: Response) {
    try {
      const { id } = req.params
      const userId = req.userId

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' })
      }

      const deleteProgramMinimumUseCase = new DeleteProgramMinimumUseCase(
        programMinimumRepository,
      )
      await deleteProgramMinimumUseCase.execute(id)
      res.status(204).send()
    } catch (error: unknown) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default ProgramMinimumController

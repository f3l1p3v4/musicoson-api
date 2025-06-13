import { Request, Response } from 'express'
import { CreateTaskUseCase } from '../../../application/use-cases/CreateTaskUseCase'
import { UpdateTaskStatusUseCase } from '../../../application/use-cases/UpdateTaskStatusUseCase'
import { ListTasksUseCase } from '../../../application/use-cases/ListTasksUseCase'
import { createTaskSchema } from '../../../application/schemas/CreateTaskSchema'
import { updateTaskStatusSchema } from '../../../application/schemas/UpdateTaskStatusSchema'
import { DeleteTaskUseCase } from '../../../application/use-cases/DeleteTaskUseCase'
import { TaskRepository } from '../../.../../../infra/repositories/TaskRepository'
import { NotFoundError } from '../../../infra/errors/NotFoundError'
import { UnauthorizedError } from '../../../infra/errors/UnauthorizedError'
import { AppError } from '../../../infra/errors/AppError'
import { prisma } from '../../../infra/orm/PrismaClient'

const taskRepository = new TaskRepository()

interface CustomRequest extends Request {
  user?: {
    group?: string
  }
}

class TaskController {
  static async createTask(req: Request, res: Response) {
    try {
      const taskData = createTaskSchema.parse(req.body)
      const { userId } = req
      const createTaskUseCase = new CreateTaskUseCase(taskRepository)
      const task = await createTaskUseCase.execute(userId!, taskData)
      res.status(201).json(task)
    } catch (error: unknown) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ error: error.message })
      } else if (error instanceof UnauthorizedError) {
        res.status(403).json({ error: error.message })
      } else if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message })
      } else if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }

  static async updateTaskStatus(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { status } = updateTaskStatusSchema.parse(req.body)
      const updateTaskStatusUseCase = new UpdateTaskStatusUseCase(
        taskRepository,
      )

      // Buscar a tarefa atual pelo ID
      const currentTask = await taskRepository.findById(id)

      if (!currentTask) {
        throw new NotFoundError('Task not found')
      }

      // Verificar se o status atual é o mesmo que o novo status
      if (currentTask.status === status) {
        return res
          .status(200)
          .json({ message: 'No changes, status is the same' })
      }

      // Se o status for diferente, fazer a atualização
      const task = await updateTaskStatusUseCase.execute(id, { status })
      res.status(200).json(task)
    } catch (error: unknown) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ error: error.message })
      } else if (error instanceof UnauthorizedError) {
        res.status(403).json({ error: error.message })
      } else if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message })
      } else if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }

  static async listTasks(req: Request, res: Response) {
    try {
      const listTasksUseCase = new ListTasksUseCase(taskRepository)
      const tasks = await listTasksUseCase.execute({})
      res.status(200).json(tasks)
    } catch (error: unknown) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ error: error.message })
      } else if (error instanceof UnauthorizedError) {
        res.status(403).json({ error: error.message })
      } else if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message })
      } else if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }

  static async listTasksByInstructor(req: Request, res: Response) {
    try {
      const instructorId = req.query.instructorId as string

      if (!instructorId) {
        throw new AppError('instructorId is required', 400)
      }

      const listTasksByInstructorUseCase = new ListTasksUseCase(taskRepository)
      const tasks = await listTasksByInstructorUseCase.execute({
        instructorId,
      })
      res.status(200).json(tasks)
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message })
      } else if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }

  static async listTasksByStudent(req: CustomRequest, res: Response) {
    try {
      const studentId = req.query.studentId as string

      if (!studentId) {
        throw new AppError('studentId is required', 400)
      }

      // Buscar o grupo do aluno no banco de dados
      const user = await prisma.user.findUnique({
        where: { id: studentId },
        select: { group: true },
      })

      if (!user) {
        throw new AppError('Student not found', 404)
      }

      const studentGroup = user.group

      const listTasksByStudentUseCase = new ListTasksUseCase(taskRepository)
      const tasks = await listTasksByStudentUseCase.execute({
        studentId,
        group: studentGroup || null,
      })

      res.status(200).json(tasks)
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message })
      } else if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }

  static async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params
      const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository)

      await deleteTaskUseCase.execute(id)

      res.status(204).send()
    } catch (error: unknown) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ error: error.message })
      } else if (error instanceof UnauthorizedError) {
        res.status(403).json({ error: error.message })
      } else if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message })
      } else if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }
}

export default TaskController

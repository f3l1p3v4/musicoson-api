"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateTaskUseCase_1 = require("../../../application/use-cases/CreateTaskUseCase");
const UpdateTaskStatusUseCase_1 = require("../../../application/use-cases/UpdateTaskStatusUseCase");
const ListTasksUseCase_1 = require("../../../application/use-cases/ListTasksUseCase");
const CreateTaskSchema_1 = require("../../../application/schemas/CreateTaskSchema");
const UpdateTaskStatusSchema_1 = require("../../../application/schemas/UpdateTaskStatusSchema");
const DeleteTaskUseCase_1 = require("../../../application/use-cases/DeleteTaskUseCase");
const TaskRepository_1 = require("../../.../../../infra/repositories/TaskRepository");
const NotFoundError_1 = require("../../../infra/errors/NotFoundError");
const UnauthorizedError_1 = require("../../../infra/errors/UnauthorizedError");
const AppError_1 = require("../../../infra/errors/AppError");
const PrismaClient_1 = require("../../../infra/orm/PrismaClient");
const taskRepository = new TaskRepository_1.TaskRepository();
class TaskController {
    static async createTask(req, res) {
        try {
            const taskData = CreateTaskSchema_1.createTaskSchema.parse(req.body);
            const { userId } = req;
            const createTaskUseCase = new CreateTaskUseCase_1.CreateTaskUseCase(taskRepository);
            const task = await createTaskUseCase.execute(userId, taskData);
            res.status(201).json(task);
        }
        catch (error) {
            if (error instanceof NotFoundError_1.NotFoundError) {
                res.status(404).json({ error: error.message });
            }
            else if (error instanceof UnauthorizedError_1.UnauthorizedError) {
                res.status(403).json({ error: error.message });
            }
            else if (error instanceof AppError_1.AppError) {
                res.status(error.statusCode).json({ error: error.message });
            }
            else if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
    static async updateTaskStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = UpdateTaskStatusSchema_1.updateTaskStatusSchema.parse(req.body);
            const updateTaskStatusUseCase = new UpdateTaskStatusUseCase_1.UpdateTaskStatusUseCase(taskRepository);
            // Buscar a tarefa atual pelo ID
            const currentTask = await taskRepository.findById(id);
            if (!currentTask) {
                throw new NotFoundError_1.NotFoundError('Task not found');
            }
            // Verificar se o status atual é o mesmo que o novo status
            if (currentTask.status === status) {
                return res
                    .status(200)
                    .json({ message: 'No changes, status is the same' });
            }
            // Se o status for diferente, fazer a atualização
            const task = await updateTaskStatusUseCase.execute(id, { status });
            res.status(200).json(task);
        }
        catch (error) {
            if (error instanceof NotFoundError_1.NotFoundError) {
                res.status(404).json({ error: error.message });
            }
            else if (error instanceof UnauthorizedError_1.UnauthorizedError) {
                res.status(403).json({ error: error.message });
            }
            else if (error instanceof AppError_1.AppError) {
                res.status(error.statusCode).json({ error: error.message });
            }
            else if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
    static async listTasks(req, res) {
        try {
            const listTasksUseCase = new ListTasksUseCase_1.ListTasksUseCase(taskRepository);
            const tasks = await listTasksUseCase.execute({});
            res.status(200).json(tasks);
        }
        catch (error) {
            if (error instanceof NotFoundError_1.NotFoundError) {
                res.status(404).json({ error: error.message });
            }
            else if (error instanceof UnauthorizedError_1.UnauthorizedError) {
                res.status(403).json({ error: error.message });
            }
            else if (error instanceof AppError_1.AppError) {
                res.status(error.statusCode).json({ error: error.message });
            }
            else if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
    static async listTasksByInstructor(req, res) {
        try {
            const instructorId = req.query.instructorId;
            if (!instructorId) {
                throw new AppError_1.AppError('instructorId is required', 400);
            }
            const listTasksByInstructorUseCase = new ListTasksUseCase_1.ListTasksUseCase(taskRepository);
            const tasks = await listTasksByInstructorUseCase.execute({
                instructorId,
            });
            res.status(200).json(tasks);
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                res.status(error.statusCode).json({ error: error.message });
            }
            else if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
    static async listTasksByStudent(req, res) {
        try {
            const studentId = req.query.studentId;
            if (!studentId) {
                throw new AppError_1.AppError('studentId is required', 400);
            }
            // Buscar o grupo do aluno no banco de dados
            const user = await PrismaClient_1.prisma.user.findUnique({
                where: { id: studentId },
                select: { group: true },
            });
            if (!user) {
                throw new AppError_1.AppError('Student not found', 404);
            }
            const studentGroup = user.group;
            const listTasksByStudentUseCase = new ListTasksUseCase_1.ListTasksUseCase(taskRepository);
            const tasks = await listTasksByStudentUseCase.execute({
                studentId,
                group: studentGroup || null,
            });
            res.status(200).json(tasks);
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                res.status(error.statusCode).json({ error: error.message });
            }
            else if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
    static async deleteTask(req, res) {
        try {
            const { id } = req.params;
            const deleteTaskUseCase = new DeleteTaskUseCase_1.DeleteTaskUseCase(taskRepository);
            await deleteTaskUseCase.execute(id);
            res.status(204).send();
        }
        catch (error) {
            if (error instanceof NotFoundError_1.NotFoundError) {
                res.status(404).json({ error: error.message });
            }
            else if (error instanceof UnauthorizedError_1.UnauthorizedError) {
                res.status(403).json({ error: error.message });
            }
            else if (error instanceof AppError_1.AppError) {
                res.status(error.statusCode).json({ error: error.message });
            }
            else if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
}
exports.default = TaskController;
//# sourceMappingURL=TaskController.js.map
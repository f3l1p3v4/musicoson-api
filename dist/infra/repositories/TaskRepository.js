"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const client_1 = require("@prisma/client");
class TaskRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async findById(id) {
        return this.prisma.task.findUnique({
            where: { id },
        });
    }
    async create(data, instructorId) {
        const existingTask = await this.prisma.task.findFirst({
            where: {
                title: data.title,
                description: data.description,
                category: data.category,
                instructorId,
                studentId: data.studentId ?? undefined,
                group: data.group ?? undefined,
            },
        });
        if (existingTask) {
            throw new Error('Task already exists');
        }
        return this.prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
                observation: data.observation,
                delivery_date: data.delivery_date,
                status: data.status ?? 'PENDING',
                category: data.category,
                instructorId,
                studentId: data.studentId ?? null,
                group: data.group ?? null,
            },
        });
    }
    async updateStatus(id, status) {
        return this.prisma.task.update({
            where: { id },
            data: { status },
        });
    }
    async list() {
        return this.prisma.task.findMany();
    }
    async listByInstructor(instructorId) {
        return this.prisma.task.findMany({
            where: {
                OR: [{ instructorId }, { group: { not: null } }],
            },
        });
    }
    async listByStudent(studentId, group) {
        return this.prisma.task.findMany({
            where: {
                OR: [{ studentId }, { group }],
            },
        });
    }
    async delete(id) {
        const task = await this.prisma.task.findUnique({ where: { id } });
        if (!task) {
            throw new Error('Task not found');
        }
        await this.prisma.task.delete({ where: { id } });
    }
}
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=TaskRepository.js.map
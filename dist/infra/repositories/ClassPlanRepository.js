"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassPlanRepository = void 0;
const PrismaClient_1 = require("../../infra/orm/PrismaClient");
class ClassPlanRepository {
    async create(data) {
        if (!data.instructor_id) {
            throw new Error('Instructor ID is required');
        }
        return PrismaClient_1.prisma.classPlan.create({
            data: {
                group: data.group,
                date: new Date(data.date),
                subject: data.subject,
                page: data.page,
                exercise: data.exercise,
                classNumber: data.classNumber,
                semester: data.semester,
                ano: data.ano,
                method: data.method,
                instructor: {
                    connect: { id: data.instructor_id },
                },
            },
        });
    }
    async findAll(filters) {
        return PrismaClient_1.prisma.classPlan.findMany({
            where: {
                group: filters?.group,
                date: filters?.date ? { equals: filters.date } : undefined,
            },
        });
    }
    async update(id, data) {
        return PrismaClient_1.prisma.classPlan.update({ where: { id }, data });
    }
}
exports.ClassPlanRepository = ClassPlanRepository;
//# sourceMappingURL=ClassPlanRepository.js.map
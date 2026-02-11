"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeRepository = void 0;
const PrismaClient_1 = require("../../infra/orm/PrismaClient");
class NoticeRepository {
    async create(data, instructorId) {
        return await PrismaClient_1.prisma.notice.create({
            data: {
                ...data,
                instructorId,
            },
        });
    }
    async findAll() {
        return await PrismaClient_1.prisma.notice.findMany();
    }
    async update(id, data) {
        return await PrismaClient_1.prisma.notice.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        await PrismaClient_1.prisma.notice.delete({
            where: { id },
        });
    }
    async findById(id) {
        return await PrismaClient_1.prisma.notice.findUnique({
            where: { id },
        });
    }
}
exports.NoticeRepository = NoticeRepository;
//# sourceMappingURL=NoticeRepository.js.map
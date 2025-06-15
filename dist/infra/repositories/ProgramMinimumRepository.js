"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramMinimumRepository = void 0;
const PrismaClient_1 = require("../../infra/orm/PrismaClient");
class ProgramMinimumRepository {
    async create(data, instructorId) {
        const existingProgramMinimum = await PrismaClient_1.prisma.programMinimum.findFirst({
            where: {
                instrument: data.instrument,
                meetings: {
                    every: {
                        name: {
                            in: data.meetings?.map((meeting) => meeting.name) || [],
                        },
                    },
                },
                cults: {
                    every: {
                        name: {
                            in: data.cults?.map((cult) => cult.name) || [],
                        },
                    },
                },
                officialization: {
                    every: {
                        name: {
                            in: data.officialization?.map((officialization) => officialization.name) || [],
                        },
                    },
                },
            },
        });
        if (existingProgramMinimum) {
            throw new Error('Datas already exists');
        }
        return await PrismaClient_1.prisma.programMinimum.create({
            data: {
                instrument: data.instrument || '',
                meetings: {
                    create: data.meetings?.map((meeting) => ({
                        name: meeting.name,
                    })) || [],
                },
                cults: {
                    create: data.cults?.map((cult) => ({
                        name: cult.name,
                    })) || [],
                },
                officialization: {
                    create: data.officialization?.map((officialization) => ({
                        name: officialization.name,
                    })) || [],
                },
                instructorId,
            },
        });
    }
    async findAll() {
        return await PrismaClient_1.prisma.programMinimum.findMany({
            include: {
                meetings: true,
                cults: true,
                officialization: true,
            },
        });
    }
    async update(id, data) {
        return await PrismaClient_1.prisma.programMinimum.update({
            where: { id },
            data: {
                instrument: data.instrument || '', // Garantir que o valor seja uma string
                meetings: data.meetings
                    ? {
                        deleteMany: {}, // Deleta todos os meetings antigos
                        create: data.meetings.map((meeting) => ({
                            name: meeting.name,
                        })),
                    }
                    : undefined,
                cults: data.cults
                    ? {
                        deleteMany: {}, // Deleta todos os cults antigos
                        create: data.cults.map((cult) => ({
                            name: cult.name,
                        })),
                    }
                    : undefined,
                officialization: data.officialization
                    ? {
                        deleteMany: {}, // Deleta todas as officializations antigas
                        create: data.officialization.map((officialization) => ({
                            name: officialization.name,
                        })),
                    }
                    : undefined,
            },
        });
    }
    async delete(id) {
        await PrismaClient_1.prisma.programMinimum.delete({
            where: { id },
        });
    }
    async findById(id) {
        return await PrismaClient_1.prisma.programMinimum.findUnique({
            where: { id },
        });
    }
}
exports.ProgramMinimumRepository = ProgramMinimumRepository;
//# sourceMappingURL=ProgramMinimumRepository.js.map
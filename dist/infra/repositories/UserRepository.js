"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const PrismaClient_1 = require("../orm/PrismaClient");
const User_1 = require("../../domain/entities/User");
const DuplicateUserError_1 = require("../../application/errors/DuplicateUserError");
class UserRepository {
    async save(user) {
        const existingUser = await PrismaClient_1.prisma.user.findFirst({
            where: {
                OR: [{ email: user.email }, { phone: user.phone }],
            },
        });
        if (existingUser) {
            throw new DuplicateUserError_1.DuplicateUserError('Email or phone number already in use');
        }
        const savedUser = await PrismaClient_1.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                password_hash: user.password_hash,
                role: user.role,
                instrument: user.instrument,
                group: user.group,
                practical_level: user.practical_level,
            },
        });
        return this.mapPrismaUserToUser(savedUser);
    }
    async findByEmail(email) {
        const prismaUser = await PrismaClient_1.prisma.user.findUnique({
            where: { email },
        });
        if (!prismaUser)
            return null;
        return this.mapPrismaUserToUser(prismaUser);
    }
    async findById(id) {
        const prismaUser = await PrismaClient_1.prisma.user.findUnique({
            where: { id },
        });
        if (!prismaUser)
            return null;
        return this.mapPrismaUserToUser(prismaUser);
    }
    async update(id, data) {
        const updatedUser = await PrismaClient_1.prisma.user.update({
            where: { id },
            data,
        });
        return this.mapPrismaUserToUser(updatedUser);
    }
    async delete(id) {
        await PrismaClient_1.prisma.user.delete({
            where: { id },
        });
    }
    async findAll() {
        const prismaUsers = await PrismaClient_1.prisma.user.findMany();
        return prismaUsers.map(this.mapPrismaUserToUser);
    }
    mapPrismaUserToUser(prismaUser) {
        return new User_1.User(prismaUser.id, prismaUser.name, prismaUser.email, prismaUser.phone, prismaUser.password_hash, prismaUser.role, prismaUser.createdAt, prismaUser.updatedAt, prismaUser.instrument, prismaUser.group, prismaUser.practical_level);
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureInstructor = exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const PrismaClient_1 = require("../../../infra/orm/PrismaClient");
const client_1 = require("@prisma/client");
const ensureAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        const user = await PrismaClient_1.prisma.user.findUnique({ where: { id: req.userId } });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        req.userRole = user.role;
        return next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Token invalid' });
    }
};
exports.ensureAuthenticated = ensureAuthenticated;
const ensureInstructor = (req, res, next) => {
    if (req.userRole !== client_1.UserRole.INSTRUCTOR) {
        return res.status(403).json({ error: 'Access denied' });
    }
    return next();
};
exports.ensureInstructor = ensureInstructor;
//# sourceMappingURL=auth.js.map
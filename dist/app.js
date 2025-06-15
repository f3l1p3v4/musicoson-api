"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserRoutes_1 = require("./infra/http/routes/UserRoutes");
const TaskRoutes_1 = require("./infra/http/routes/TaskRoutes");
const NoticeRoute_1 = require("./infra/http/routes/NoticeRoute");
const ProgramMinimumRoute_1 = require("./infra/http/routes/ProgramMinimumRoute");
const attendanceRoutes_1 = require("./infra/http/routes/attendanceRoutes");
const ClassPlanRoutes_1 = require("./infra/http/routes/ClassPlanRoutes");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:4173',
        'http://127.0.0.1:4173',
        'https://musicoson-web.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use('/users', UserRoutes_1.UserRoutes);
app.use('/tasks', TaskRoutes_1.TaskRoutes);
app.use('/notices', NoticeRoute_1.NoticeRoute);
app.use('/program-minimum', ProgramMinimumRoute_1.ProgramMinimumRoute);
app.use('/attendance', attendanceRoutes_1.AttendanceRoute);
app.use('/class-plan', ClassPlanRoutes_1.classPlanRoutes);
//# sourceMappingURL=app.js.map
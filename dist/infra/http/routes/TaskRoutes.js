"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const express_1 = require("express");
const TaskController_1 = __importDefault(require("../controllers/TaskController"));
const auth_1 = require("../../../infra/http/middlewares/auth");
const router = (0, express_1.Router)();
exports.TaskRoutes = router;
router.post('/', auth_1.ensureAuthenticated, auth_1.ensureInstructor, TaskController_1.default.createTask);
router.put('/:id/status', auth_1.ensureAuthenticated, auth_1.ensureInstructor, TaskController_1.default.updateTaskStatus);
router.get('/', auth_1.ensureAuthenticated, auth_1.ensureInstructor, TaskController_1.default.listTasks);
router.get('/instructor', auth_1.ensureAuthenticated, auth_1.ensureInstructor, TaskController_1.default.listTasksByInstructor);
router.get('/student', auth_1.ensureAuthenticated, TaskController_1.default.listTasksByStudent);
router.delete('/:id', auth_1.ensureAuthenticated, auth_1.ensureInstructor, TaskController_1.default.deleteTask);
//# sourceMappingURL=TaskRoutes.js.map
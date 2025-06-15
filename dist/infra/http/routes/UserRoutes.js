"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const auth_1 = require("../../../infra/http/middlewares/auth");
const routes = (0, express_1.Router)();
exports.UserRoutes = routes;
const userController = new UserController_1.UserController();
routes.get('/', auth_1.ensureAuthenticated, auth_1.ensureInstructor, userController.list.bind(userController));
routes.get('/:id', auth_1.ensureAuthenticated, userController.findById.bind(userController));
routes.post('/register', userController.register.bind(userController));
routes.post('/login', userController.authenticate.bind(userController));
routes.put('/:id', auth_1.ensureAuthenticated, auth_1.ensureInstructor, userController.update.bind(userController));
routes.delete('/:id', auth_1.ensureAuthenticated, auth_1.ensureInstructor, userController.delete.bind(userController));
//# sourceMappingURL=UserRoutes.js.map
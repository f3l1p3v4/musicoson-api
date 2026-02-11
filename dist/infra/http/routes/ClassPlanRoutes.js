"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classPlanRoutes = void 0;
const express_1 = require("express");
const ClassPlanController_1 = require("../../../infra/http/controllers/ClassPlanController");
const auth_1 = require("../../../infra/http/middlewares/auth");
const ClassPlanRepository_1 = require("../../../infra/repositories/ClassPlanRepository");
const CreateClassPlanUseCase_1 = require("../../../application/use-cases/CreateClassPlanUseCase");
const ListClassPlansUseCase_1 = require("../../../application/use-cases/ListClassPlansUseCase");
const UpdateClassPlanUseCase_1 = require("../../../application/use-cases/UpdateClassPlanUseCase");
const router = (0, express_1.Router)();
exports.classPlanRoutes = router;
const classPlanRepository = new ClassPlanRepository_1.ClassPlanRepository();
const classPlanController = new ClassPlanController_1.ClassPlanController(new CreateClassPlanUseCase_1.CreateClassPlanUseCase(classPlanRepository), new ListClassPlansUseCase_1.ListClassPlansUseCase(classPlanRepository), new UpdateClassPlanUseCase_1.UpdateClassPlanUseCase(classPlanRepository));
router.post('/', auth_1.ensureAuthenticated, auth_1.ensureInstructor, classPlanController.create.bind(classPlanController));
router.get('/', auth_1.ensureAuthenticated, classPlanController.list.bind(classPlanController));
router.put('/:id', auth_1.ensureAuthenticated, auth_1.ensureInstructor, classPlanController.update.bind(classPlanController));
//# sourceMappingURL=ClassPlanRoutes.js.map
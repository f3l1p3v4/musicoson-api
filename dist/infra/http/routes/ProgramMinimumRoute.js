"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramMinimumRoute = void 0;
const express_1 = require("express");
const ProgramMinimumController_1 = __importDefault(require("../controllers/ProgramMinimumController"));
const auth_1 = require("../../../infra/http/middlewares/auth");
const router = (0, express_1.Router)();
exports.ProgramMinimumRoute = router;
router.post('/', auth_1.ensureAuthenticated, auth_1.ensureInstructor, ProgramMinimumController_1.default.createProgramMinimum);
router.get('/', ProgramMinimumController_1.default.listProgramMinimums);
router.put('/:id', auth_1.ensureAuthenticated, auth_1.ensureInstructor, ProgramMinimumController_1.default.updateProgramMinimum);
router.delete('/:id', auth_1.ensureAuthenticated, auth_1.ensureInstructor, ProgramMinimumController_1.default.deleteProgramMinimum);
//# sourceMappingURL=ProgramMinimumRoute.js.map
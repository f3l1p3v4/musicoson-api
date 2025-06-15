"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeRoute = void 0;
const express_1 = require("express");
const NoticeController_1 = __importDefault(require("../controllers/NoticeController"));
const auth_1 = require("../../../infra/http/middlewares/auth");
const router = (0, express_1.Router)();
exports.NoticeRoute = router;
router.post('/', auth_1.ensureAuthenticated, auth_1.ensureInstructor, NoticeController_1.default.createNotice);
router.get('/', NoticeController_1.default.listNotices);
router.put('/:id', auth_1.ensureAuthenticated, auth_1.ensureInstructor, NoticeController_1.default.updateNotice);
router.delete('/:id', auth_1.ensureAuthenticated, auth_1.ensureInstructor, NoticeController_1.default.deleteNotice);
//# sourceMappingURL=NoticeRoute.js.map
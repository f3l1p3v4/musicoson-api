"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskStatusSchema = void 0;
const zod_1 = require("zod");
exports.updateTaskStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(['PENDING', 'COMPLETED']),
});
//# sourceMappingURL=UpdateTaskStatusDTO.js.map